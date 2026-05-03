import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const STARTER_CHECKOUT_LINK = "https://buy.stripe.com/14A8wR1xAfQi98KcPJ5wI05";
const PRO_CHECKOUT_LINK = "https://buy.stripe.com/fZudRb7VY7jMacOaHB5wI06";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

const WELCOME_EMAIL = {
  subject: "Vous êtes bien sur la liste RadarRival 🎯",
  text: `Bonjour,

Merci de votre intérêt pour RadarRival.

Nous aidons les PME et indépendants à suivre leurs concurrents sans effort. Chaque lundi matin, vous recevez un rapport clair et actionnable : changements de prix, nouvelles offres, activité réseaux sociaux et mentions presse.

Vous avez bien été ajouté à la liste RadarRival. Nos abonnements payants démarrent à 19€/mois pour Starter et 29€/mois pour Pro.

Choisir votre formule :
Starter — ${STARTER_CHECKOUT_LINK}
Pro — ${PRO_CHECKOUT_LINK}

Si vous préférez être accompagné pour le démarrage, répondez simplement à cet email.

À bientôt,
L'équipe RadarRival
contact@radarrival.com
radarrival.com`,
  html: `<div style="background:#1e3a5f;color:#ffffff;padding:10px 16px;border-radius:6px;margin-bottom:16px;font-size:13px;">
  <strong>RadarRival</strong> vous accompagne pour activer votre veille concurrentielle.
</div>
<p>Bonjour,</p>
<p>Merci de votre intérêt pour RadarRival.</p>
<p>Nous aidons les PME et indépendants à suivre leurs concurrents sans effort. Chaque lundi matin, vous recevez un rapport clair et actionnable : changements de prix, nouvelles offres, activité réseaux sociaux et mentions presse.</p>
<p>Vous avez bien été ajouté à la liste RadarRival. Nos abonnements payants démarrent à 19€/mois pour Starter et 29€/mois pour Pro.</p>
<p>Choisir votre formule :</p>
<ul>
  <li><a href="${STARTER_CHECKOUT_LINK}">Starter — 19€/mois</a></li>
  <li><a href="${PRO_CHECKOUT_LINK}">Pro — 29€/mois</a></li>
</ul>
<p>Si vous préférez être accompagné pour le démarrage, répondez simplement à cet email.</p>
<p>À bientôt,<br>L'équipe RadarRival<br>contact@radarrival.com<br><a href="https://radarrival.com">radarrival.com</a></p>`,
} as const;

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
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "RadarRival <noreply@radarrival.com>",
          to: trimmed,
          subject: WELCOME_EMAIL.subject,
          html: WELCOME_EMAIL.html,
          text: WELCOME_EMAIL.text,
        });
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
