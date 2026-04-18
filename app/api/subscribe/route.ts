import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const NANOCORP_BACKEND_URL =
  process.env.NANOCORP_BACKEND_URL ??
  "https://phospho-nanocorp-prod--nanocorp-api-fastapi-app.modal.run";
const NANOCORP_AGENT_SECRET = process.env.NANOCORP_AGENT_SECRET;

const WELCOME_EMAIL = {
  subject: "Bienvenue chez RadarRival 🎯",
  text: `✉️ Ceci est un email de RadarRival — radarrival.com
---

Bonjour,

Merci de votre intérêt pour RadarRival !

Nous aidons les PME et indépendants à suivre leurs concurrents sans effort. Chaque lundi matin, vous recevez un rapport clair et actionnable : changements de prix, nouvelles offres, activité réseaux sociaux, mentions presse.

Pour commencer votre essai gratuit de 7 jours (sans carte bancaire), cliquez ici :
👉 https://radarrival.com

Des questions ? Répondez simplement à cet email.

À lundi,
L'équipe RadarRival
contact@radarrival.com | linkedin.com/company/radarrival`,
  html: `<div style="background:#1e3a5f;color:#ffffff;padding:10px 16px;border-radius:6px;margin-bottom:16px;font-size:13px;">
  ✉️ Email envoyé par <strong>RadarRival</strong> — <a href="https://radarrival.com" style="color:#93c5fd;">radarrival.com</a>
</div>
<p>Bonjour,</p>
<p>Merci de votre intérêt pour RadarRival !</p>
<p>Nous aidons les PME et indépendants à suivre leurs concurrents sans effort. Chaque lundi matin, vous recevez un rapport clair et actionnable : changements de prix, nouvelles offres, activité réseaux sociaux, mentions presse.</p>
<p>Pour commencer votre essai gratuit de 7 jours (sans carte bancaire), cliquez ici :<br>👉 <a href="https://radarrival.com">https://radarrival.com</a></p>
<p>Des questions ? Répondez simplement à cet email.</p>
<p>À lundi,<br>L'équipe RadarRival<br>contact@radarrival.com | linkedin.com/company/radarrival</p>`,
} as const;

async function sendWelcomeEmail(email: string) {
  if (!NANOCORP_AGENT_SECRET) {
    throw new Error("NANOCORP_AGENT_SECRET is not configured");
  }

  const response = await fetch(
    `${NANOCORP_BACKEND_URL}/internal/tools/send_email/execute`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NANOCORP_AGENT_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arguments: {
          to: email,
          subject: WELCOME_EMAIL.subject,
          // NanoCorp's send_email tool currently honors a single rendered body field.
          body: WELCOME_EMAIL.html,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`NanoCorp email API returned ${response.status}: ${errorText}`);
  }

  const payload = (await response.json()) as {
    error?: unknown;
    success?: boolean;
  };

  if (!payload.success) {
    throw new Error(`NanoCorp email API reported failure: ${JSON.stringify(payload.error)}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const insertResult = await pool.query(
      "INSERT INTO leads (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      [trimmed, source || "landing_page"]
    );

    if (insertResult.rowCount && insertResult.rowCount > 0) {
      try {
        await sendWelcomeEmail(trimmed);
      } catch (error) {
        console.error("Failed to send welcome email after lead signup", {
          email: trimmed,
          error,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
