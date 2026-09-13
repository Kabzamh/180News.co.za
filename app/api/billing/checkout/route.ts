import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { activateMonthlySubscription, detectCardBrand, expiryValid, luhnValid } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in to pay." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      method?: string;
      cardNumber?: string;
      expiry?: string;
      cvc?: string;
      cardName?: string;
    };
    const method =
      body.method === "eft"
        ? "Instant EFT"
        : body.method === "gpay" || body.method === "google"
          ? "Google Pay"
          : "Card";

    if (method === "Card") {
      const number = (body.cardNumber ?? "").replace(/\s+/g, "");
      const expiry = body.expiry ?? "";
      const cvc = (body.cvc ?? "").trim();
      const cardName = body.cardName?.trim() ?? "";
      if (cardName.length < 2) {
        return NextResponse.json({ ok: false, error: "Enter the name on the card." }, { status: 400 });
      }
      if (!luhnValid(number)) {
        return NextResponse.json({ ok: false, error: "Enter a valid card number." }, { status: 400 });
      }
      if (!expiryValid(expiry)) {
        return NextResponse.json({ ok: false, error: "Enter a valid expiry date (MM/YY)." }, { status: 400 });
      }
      if (!/^\d{3,4}$/.test(cvc)) {
        return NextResponse.json({ ok: false, error: "Enter the CVC." }, { status: 400 });
      }
      const result = await activateMonthlySubscription({
        subscriberId: user.id,
        method,
        cardBrand: detectCardBrand(number),
        cardLast4: number.slice(-4),
      });
      return NextResponse.json({
        ok: true,
        reference: result.reference,
        periodEnd: result.periodEnd.toISOString(),
      });
    }

    const result = await activateMonthlySubscription({
      subscriberId: user.id,
      method,
    });
    return NextResponse.json({
      ok: true,
      reference: result.reference,
      periodEnd: result.periodEnd.toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Payment could not be completed." }, { status: 500 });
  }
}
