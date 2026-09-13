"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MONTHLY_PLAN } from "@/lib/constants";

type Method = "card" | "gpay" | "eft";

async function completeCheckout(payload: Record<string, string>) {
  const response = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as { ok: boolean; error?: string; reference?: string };
  if (!response.ok || !data.ok) throw new Error(data.error || "Payment failed.");
  return data.reference ?? "1";
}

async function requestGooglePay() {
  if (typeof PaymentRequest === "undefined") return false;
  const request = new PaymentRequest(
    [
      {
        supportedMethods: "https://google.com/pay",
        data: {
          environment: "TEST",
          apiVersion: 2,
          apiVersionMinor: 0,
          merchantInfo: {
            merchantName: "180 Degrees News",
            merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || "12345678901234567890",
          },
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
        },
      },
    ],
    {
      total: {
        label: "180° Digital Bulletin",
        amount: { currency: "ZAR", value: (MONTHLY_PLAN.amountCents / 100).toFixed(2) },
      },
    },
  );
  const canPay = await request.canMakePayment().catch(() => false);
  if (!canPay) return false;
  const sheet = await request.show();
  await sheet.complete("success");
  return true;
}

export function CheckoutForm() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("gpay");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function finish(payload: Record<string, string>) {
    const reference = await completeCheckout(payload);
    router.push(`/account?paid=${reference}`);
    router.refresh();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (method === "gpay") {
        await requestGooglePay().catch(() => false);
        await finish({ method: "gpay" });
        return;
      }
      if (method === "eft") {
        await finish({ method: "eft" });
        return;
      }
      await finish({ method: "card", cardName, cardNumber, expiry, cvc });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setBusy(false);
    }
  }

  const methods: Array<{ id: Method; label: string }> = [
    { id: "gpay", label: "Google Pay" },
    { id: "card", label: "Card" },
    { id: "eft", label: "Instant EFT" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        Test checkout. Google Pay uses Google&apos;s TEST wallet where the browser supports it; otherwise the month is
        still recorded as Google Pay. Connect PayFast/Stripe before live rand.
      </p>
      <div className="flex flex-wrap gap-2">
        {methods.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMethod(item.id)}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
              method === item.id ? "bg-[#0b2f8a] text-white" : "border border-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {method === "gpay" ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Pay {MONTHLY_PLAN.label} with Google Pay. Visa and Mastercard in your Google account are accepted.
          </p>
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <span className="rounded-sm bg-white px-1 py-0.5 text-[11px] font-bold text-black">G</span>
            {busy ? "Opening Google Pay..." : "Pay with Google Pay"}
          </button>
        </div>
      ) : null}

      {method === "card" ? (
        <div className="space-y-3">
          <label className="block text-sm">
            Name on card
            <input
              required={method === "card"}
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Card number
            <input
              required={method === "card"}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Expiry (MM/YY)
              <input
                required={method === "card"}
                placeholder="08/28"
                value={expiry}
                onChange={(event) => setExpiry(event.target.value)}
                className="mt-1 w-full border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              CVC
              <input
                required={method === "card"}
                inputMode="numeric"
                value={cvc}
                onChange={(event) => setCvc(event.target.value)}
                className="mt-1 w-full border border-slate-300 px-3 py-2"
              />
            </label>
          </div>
        </div>
      ) : null}

      {method === "eft" ? (
        <p className="text-sm text-slate-600">
          Instant EFT will raise a {MONTHLY_PLAN.label} debit against your profile and open the bulletin for 30 days.
        </p>
      ) : null}

      {method !== "gpay" ? (
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-[#8f1520] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-60"
        >
          {busy ? "Processing..." : `Pay ${MONTHLY_PLAN.label}`}
        </button>
      ) : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
