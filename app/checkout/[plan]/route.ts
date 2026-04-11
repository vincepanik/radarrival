import { NextRequest, NextResponse } from "next/server";

const PAYMENT_LINK_EXPOSED_ID = "cNi6oI5PmeXl36q8cHeOq2z";
const MERCHANT_UI_API_BASE = "https://merchant-ui-api.stripe.com";
const STRIPE_API_BASE = "https://api.stripe.com/v1";
const EID = "NA";

const PLAN_NAMES = {
  starter: "Starter Plan",
  pro: "Pro Plan",
} as const;

type CheckoutPlan = keyof typeof PLAN_NAMES;

type CheckoutLineItem = {
  id: string;
  name: string;
  quantity: number;
};

type CheckoutSession = {
  session_id: string;
  url: string;
  line_item_group: {
    line_items: CheckoutLineItem[];
  };
};

type PaymentLinkConfig = {
  key: string;
};

export const dynamic = "force-dynamic";

function isCheckoutPlan(value: string): value is CheckoutPlan {
  return value in PLAN_NAMES;
}

async function stripeJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Stripe request failed (${response.status}): ${message}`);
  }

  return (await response.json()) as T;
}

async function createCheckoutSession(locale: string, timezone: string): Promise<CheckoutSession> {
  const body = new URLSearchParams({
    eid: EID,
    browser_locale: locale,
    browser_timezone: timezone,
  });

  return stripeJson<CheckoutSession>(`${MERCHANT_UI_API_BASE}/payment-links/${PAYMENT_LINK_EXPOSED_ID}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
}

async function getPaymentLinkConfig(): Promise<PaymentLinkConfig> {
  return stripeJson<PaymentLinkConfig>(`${MERCHANT_UI_API_BASE}/payment-links/${PAYMENT_LINK_EXPOSED_ID}`);
}

async function removeLineItem(sessionId: string, lineItemId: string, publishableKey: string): Promise<CheckoutSession> {
  const body = new URLSearchParams({
    eid: EID,
    "updated_line_item_quantity[line_item_id]": lineItemId,
    "updated_line_item_quantity[quantity]": "0",
    "updated_line_item_quantity[fail_update_on_discount_error]": "true",
    key: publishableKey,
  });

  return stripeJson<CheckoutSession>(`${STRIPE_API_BASE}/payment_pages/${sessionId}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      referer: "https://buy.stripe.com/",
    },
    body: body.toString(),
  });
}

export async function GET(request: NextRequest, context: RouteContext<"/checkout/[plan]">) {
  const { plan } = await context.params;

  if (!isCheckoutPlan(plan)) {
    return NextResponse.redirect(new URL("/#pricing", request.url), 302);
  }

  try {
    const locale = request.headers.get("accept-language")?.split(",")[0] ?? "en-US";
    const timezone = request.headers.get("x-vercel-ip-timezone") ?? "UTC";
    const [paymentLinkConfig, checkoutSession] = await Promise.all([
      getPaymentLinkConfig(),
      createCheckoutSession(locale, timezone),
    ]);

    const desiredPlanName = PLAN_NAMES[plan];
    const lineItems = checkoutSession.line_item_group.line_items;
    const desiredLineItem = lineItems.find((item) => item.name === desiredPlanName);

    if (!desiredLineItem) {
      throw new Error(`Missing desired checkout line item for ${desiredPlanName}`);
    }

    let redirectUrl = checkoutSession.url;
    const unwantedLineItems = lineItems.filter((item) => item.name !== desiredPlanName && item.quantity > 0);

    for (const lineItem of unwantedLineItems) {
      const updatedSession = await removeLineItem(
        checkoutSession.session_id,
        lineItem.id,
        paymentLinkConfig.key,
      );

      redirectUrl = updatedSession.url ?? redirectUrl;
    }

    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error("Failed to create plan-specific checkout session", error);
    return NextResponse.redirect(new URL("/#pricing", request.url), 302);
  }
}
