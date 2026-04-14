import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_type, payment } = body;

    if (event_type === "checkout.session.completed") {
      console.log("Payment received:", {
        email: payment?.customer_email,
        amount: payment?.amount_cents,
        session: payment?.stripe_session_id,
      });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
