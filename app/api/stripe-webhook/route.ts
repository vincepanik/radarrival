import { createHmac, timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

import { sendNanoCorpEmail } from "@/lib/nanocorp-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const STRIPE_SIGNATURE_TOLERANCE_SECONDS = 300;
const ONBOARDING_EMAIL_SUBJECT =
  "Votre abonnement RadarRival est actif 🎯 — dites-nous qui surveiller";

type PlanInfo = {
  name: "Starter" | "Pro";
  competitorLimit: 3 | 5;
};

type StripeEventPayload = {
  id?: string;
  type?: string;
  data?: {
    object?: Record<string, unknown>;
  };
};

type PartialOnboardingState = {
  dedupeKey: string | null;
  checkoutSessionId: string | null;
  subscriptionId: string | null;
  customerEmail: string | null;
  plan: PlanInfo | null;
};

type StoredOnboardingState = {
  dedupe_key: string;
  customer_email: string | null;
  plan_name: string | null;
  competitor_limit: number | null;
  onboarding_email_sent_at: string | null;
};

let onboardingStateTableReady: Promise<void> | null = null;

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function numberValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function arrayValue(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function constantTimeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyStripeSignature(rawBody: string, signatureHeader: string, secret: string) {
  const parts = signatureHeader.split(",");
  const timestamp = parts
    .find((part) => part.startsWith("t="))
    ?.slice(2);
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3))
    .filter(Boolean);

  if (!timestamp || signatures.length === 0) {
    throw new Error("Malformed Stripe signature header");
  }

  const ageInSeconds = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(ageInSeconds) || ageInSeconds > STRIPE_SIGNATURE_TOLERANCE_SECONDS) {
    throw new Error("Stripe signature timestamp is outside the allowed tolerance");
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  const matches = signatures.some((signature) =>
    constantTimeEquals(signature, expectedSignature)
  );

  if (!matches) {
    throw new Error("Invalid Stripe signature");
  }
}

function detectPlanFromName(name: string | null): PlanInfo | null {
  if (!name) {
    return null;
  }

  const normalized = name.toLowerCase();

  if (normalized.includes("starter")) {
    return { name: "Starter", competitorLimit: 3 };
  }

  if (normalized.includes("pro")) {
    return { name: "Pro", competitorLimit: 5 };
  }

  return null;
}

function detectPlanFromAmount(amount: number | null): PlanInfo | null {
  if (amount === 1900) {
    return { name: "Starter", competitorLimit: 3 };
  }

  if (amount === 2900) {
    return { name: "Pro", competitorLimit: 5 };
  }

  return null;
}

function detectPlanFromCheckoutSession(session: Record<string, unknown>): PlanInfo | null {
  const metadata = recordValue(session.metadata);
  const amountCandidates = [
    numberValue(session.amount_subtotal),
    numberValue(session.amount_total),
  ];
  const stringCandidates = [
    stringValue(metadata?.plan),
    stringValue(metadata?.plan_name),
    stringValue(metadata?.tier),
    stringValue(session.client_reference_id),
  ];

  for (const candidate of stringCandidates) {
    const detected = detectPlanFromName(candidate);
    if (detected) {
      return detected;
    }
  }

  for (const candidate of amountCandidates) {
    const detected = detectPlanFromAmount(candidate);
    if (detected) {
      return detected;
    }
  }

  return null;
}

function detectPlanFromSubscription(subscription: Record<string, unknown>): PlanInfo | null {
  const metadata = recordValue(subscription.metadata);
  const items = recordValue(subscription.items);
  const itemList = arrayValue(items?.data);
  const stringCandidates = [
    stringValue(metadata?.plan),
    stringValue(metadata?.plan_name),
    stringValue(metadata?.tier),
  ];
  const amountCandidates: Array<number | null> = [];

  for (const item of itemList) {
    const itemRecord = recordValue(item);
    const price = recordValue(itemRecord?.price);
    const plan = recordValue(itemRecord?.plan);
    const priceMetadata = recordValue(price?.metadata);

    stringCandidates.push(
      stringValue(price?.nickname),
      stringValue(price?.lookup_key),
      stringValue(priceMetadata?.plan),
      stringValue(priceMetadata?.plan_name),
      stringValue(plan?.nickname)
    );

    amountCandidates.push(
      numberValue(price?.unit_amount),
      numberValue(plan?.amount),
      numberValue(itemRecord?.amount_total)
    );
  }

  for (const candidate of stringCandidates) {
    const detected = detectPlanFromName(candidate);
    if (detected) {
      return detected;
    }
  }

  for (const candidate of amountCandidates) {
    const detected = detectPlanFromAmount(candidate);
    if (detected) {
      return detected;
    }
  }

  return null;
}

function extractFromCheckoutSession(session: Record<string, unknown>): PartialOnboardingState {
  const customerDetails = recordValue(session.customer_details);
  const subscriptionId = stringValue(session.subscription);
  const checkoutSessionId = stringValue(session.id);

  return {
    dedupeKey: subscriptionId ?? checkoutSessionId,
    checkoutSessionId,
    subscriptionId,
    customerEmail:
      stringValue(customerDetails?.email) ??
      stringValue(session.customer_email),
    plan: detectPlanFromCheckoutSession(session),
  };
}

function extractFromSubscription(subscription: Record<string, unknown>): PartialOnboardingState {
  const metadata = recordValue(subscription.metadata);
  const subscriptionId = stringValue(subscription.id);

  return {
    dedupeKey: subscriptionId,
    checkoutSessionId: null,
    subscriptionId,
    customerEmail:
      stringValue(metadata?.customer_email) ??
      stringValue(metadata?.email),
    plan: detectPlanFromSubscription(subscription),
  };
}

function buildOnboardingEmail(plan: PlanInfo) {
  return `<p>Bonjour,</p>
<p>Votre abonnement RadarRival est actif ! 🎉</p>
<p>Pour vous préparer votre premier rapport lundi prochain, nous avons besoin d'une seule chose : les noms de vos concurrents.</p>
<p>Répondez simplement à cet email avec :</p>
<ol>
  <li>Le nom de votre entreprise / site web</li>
  <li>Jusqu'à ${plan.competitorLimit} concurrents (plan ${plan.name}) — nom ou URL</li>
</ol>
<p>Exemple :<br>
Mon site : boutique-exemple.fr<br>
Concurrents : concurrent1.fr, concurrent2.com, boutique3.fr</p>
<p>Votre rapport arrive lundi matin. 📊</p>
<p>L'équipe RadarRival<br>
contact@radarrival.com | radarrival.com</p>`;
}

async function ensureOnboardingStateTable() {
  if (!onboardingStateTableReady) {
    onboardingStateTableReady = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS stripe_onboarding_state (
          dedupe_key TEXT PRIMARY KEY,
          stripe_subscription_id TEXT,
          checkout_session_id TEXT,
          last_stripe_event_id TEXT,
          last_stripe_event_type TEXT NOT NULL,
          customer_email TEXT,
          plan_name TEXT,
          competitor_limit INTEGER,
          onboarding_email_claimed_at TIMESTAMPTZ,
          onboarding_email_sent_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS stripe_onboarding_state_subscription_id_key
        ON stripe_onboarding_state (stripe_subscription_id)
        WHERE stripe_subscription_id IS NOT NULL
      `);

      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS stripe_onboarding_state_checkout_session_id_key
        ON stripe_onboarding_state (checkout_session_id)
        WHERE checkout_session_id IS NOT NULL
      `);
    })();
  }

  await onboardingStateTableReady;
}

async function upsertOnboardingState(
  eventId: string,
  eventType: string,
  partialState: PartialOnboardingState
) {
  const result = await pool.query<StoredOnboardingState>(
    `
      INSERT INTO stripe_onboarding_state (
        dedupe_key,
        stripe_subscription_id,
        checkout_session_id,
        last_stripe_event_id,
        last_stripe_event_type,
        customer_email,
        plan_name,
        competitor_limit
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (dedupe_key) DO UPDATE
      SET
        stripe_subscription_id = COALESCE(
          stripe_onboarding_state.stripe_subscription_id,
          EXCLUDED.stripe_subscription_id
        ),
        checkout_session_id = COALESCE(
          stripe_onboarding_state.checkout_session_id,
          EXCLUDED.checkout_session_id
        ),
        customer_email = COALESCE(
          stripe_onboarding_state.customer_email,
          EXCLUDED.customer_email
        ),
        plan_name = COALESCE(
          stripe_onboarding_state.plan_name,
          EXCLUDED.plan_name
        ),
        competitor_limit = COALESCE(
          stripe_onboarding_state.competitor_limit,
          EXCLUDED.competitor_limit
        ),
        last_stripe_event_id = EXCLUDED.last_stripe_event_id,
        last_stripe_event_type = EXCLUDED.last_stripe_event_type,
        updated_at = NOW()
      RETURNING dedupe_key, customer_email, plan_name, competitor_limit, onboarding_email_sent_at
    `,
    [
      partialState.dedupeKey,
      partialState.subscriptionId,
      partialState.checkoutSessionId,
      eventId,
      eventType,
      partialState.customerEmail,
      partialState.plan?.name ?? null,
      partialState.plan?.competitorLimit ?? null,
    ]
  );

  return result.rows[0] ?? null;
}

async function claimReadyOnboardingEmail(dedupeKey: string) {
  const result = await pool.query<StoredOnboardingState>(
    `
      UPDATE stripe_onboarding_state
      SET onboarding_email_claimed_at = NOW(), updated_at = NOW()
      WHERE dedupe_key = $1
        AND onboarding_email_sent_at IS NULL
        AND onboarding_email_claimed_at IS NULL
        AND customer_email IS NOT NULL
        AND plan_name IS NOT NULL
        AND competitor_limit IS NOT NULL
      RETURNING dedupe_key, customer_email, plan_name, competitor_limit, onboarding_email_sent_at
    `,
    [dedupeKey]
  );

  return result.rows[0] ?? null;
}

async function markOnboardingEmailSent(dedupeKey: string) {
  await pool.query(
    `
      UPDATE stripe_onboarding_state
      SET onboarding_email_sent_at = NOW(), updated_at = NOW()
      WHERE dedupe_key = $1
    `,
    [dedupeKey]
  );
}

async function releaseOnboardingEmailClaim(dedupeKey: string) {
  await pool.query(
    `
      UPDATE stripe_onboarding_state
      SET onboarding_email_claimed_at = NULL, updated_at = NOW()
      WHERE dedupe_key = $1
    `,
    [dedupeKey]
  );
}

function getPlanFromStoredState(state: StoredOnboardingState): PlanInfo | null {
  const plan = detectPlanFromName(state.plan_name);

  if (!plan) {
    return null;
  }

  return state.competitor_limit === plan.competitorLimit ? plan : plan;
}

export async function POST(request: NextRequest) {
  if (!STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("stripe-signature");

  if (!signatureHeader) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  try {
    verifyStripeSignature(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Stripe signature verification failed",
      },
      { status: 400 }
    );
  }

  let event: StripeEventPayload;

  try {
    event = JSON.parse(rawBody) as StripeEventPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventType = event.type;
  const eventId = stringValue(event.id);
  const object = recordValue(event.data?.object);

  if (!eventType || !eventId || !object) {
    return NextResponse.json({ error: "Malformed Stripe event payload" }, { status: 400 });
  }

  if (
    eventType !== "checkout.session.completed" &&
    eventType !== "customer.subscription.created"
  ) {
    return NextResponse.json({ received: true, ignored: true });
  }

  const partialState =
    eventType === "checkout.session.completed"
      ? extractFromCheckoutSession(object)
      : extractFromSubscription(object);

  if (!partialState.dedupeKey) {
    return NextResponse.json(
      { received: true, ignored: true, reason: "missing-dedupe-key" },
      { status: 202 }
    );
  }

  try {
    await ensureOnboardingStateTable();
    const storedState = await upsertOnboardingState(eventId, eventType, partialState);

    const claimedState = await claimReadyOnboardingEmail(partialState.dedupeKey);
    if (!claimedState) {
      const alreadySent = storedState?.onboarding_email_sent_at !== null;
      const hasRequiredData =
        Boolean(storedState?.customer_email) &&
        Boolean(storedState?.plan_name) &&
        storedState?.competitor_limit !== null;

      return NextResponse.json({
        received: true,
        emailSent: false,
        alreadySent,
        waitingForMoreData: !alreadySent && !hasRequiredData,
      });
    }

    const plan = getPlanFromStoredState(claimedState);
    if (!claimedState.customer_email || !plan) {
      await releaseOnboardingEmailClaim(partialState.dedupeKey);

      return NextResponse.json({
        received: true,
        emailSent: false,
        waitingForMoreData: true,
      });
    }

    try {
      await sendNanoCorpEmail({
        to: claimedState.customer_email,
        subject: ONBOARDING_EMAIL_SUBJECT,
        body: buildOnboardingEmail(plan),
      });
      await markOnboardingEmailSent(partialState.dedupeKey);
    } catch (error) {
      await releaseOnboardingEmailClaim(partialState.dedupeKey);
      throw error;
    }

    return NextResponse.json({
      received: true,
      emailSent: true,
      plan: plan.name,
      customerEmail: claimedState.customer_email,
    });
  } catch (error) {
    console.error("Stripe webhook processing failed", {
      eventId,
      eventType,
      error,
    });

    return NextResponse.json(
      { error: "Failed to process Stripe webhook" },
      { status: 500 }
    );
  }
}
