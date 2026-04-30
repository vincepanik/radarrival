import { NextRequest, NextResponse } from "next/server";

const PLAN_CHECKOUT_URLS = {
  starter: "https://buy.stripe.com/14A8wR1xAfQi98KcPJ5wI05",
  pro: "https://buy.stripe.com/fZudRb7VY7jMacOaHB5wI06",
} as const;

type CheckoutPlan = keyof typeof PLAN_CHECKOUT_URLS;

export const dynamic = "force-dynamic";

function isCheckoutPlan(value: string): value is CheckoutPlan {
  return value in PLAN_CHECKOUT_URLS;
}

export async function GET(request: NextRequest, context: RouteContext<"/checkout/[plan]">) {
  const { plan } = await context.params;

  if (!isCheckoutPlan(plan)) {
    return NextResponse.redirect(new URL("/#pricing", request.url), 302);
  }

  return NextResponse.redirect(PLAN_CHECKOUT_URLS[plan], 302);
}
