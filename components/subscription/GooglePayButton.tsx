"use client";

import { useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

type PayData = {
  last4: string | null;
  network: string;
};

declare global {
  interface Window {
    google?: any;
  }
}

const SCRIPT_SRC = "https://pay.google.com/gp/p/js/pay.js";

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.payments?.api?.PaymentsClient) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("gpay failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("gpay failed"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
};

/**
 * Demo tokenisation gateway — swap `gateway`/`gatewayMerchantId` for your
 * contracted PSP (Stripe, PayGate, Peach Payments etc.) in production.
 */
function allowedPaymentMethods() {
  return [
    {
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        billingAddressRequired: false,
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "example",
          gatewayMerchantId: "180degreesnewsAllAccess",
        },
      },
    },
  ];
}

export default function GooglePayButton({
  detailsReady,
  onMissingDetails,
  onAuthorized,
  onError,
  busy,
}: {
  detailsReady: boolean;
  onMissingDetails: () => void;
  onAuthorized: (data: PayData) => void;
  onError: (msg: string) => void;
  busy: boolean;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    let client: any;

    loadScript()
      .then(() => {
        if (!window.google || cancelled) return;
        client = new window.google.payments.api.PaymentsClient({
          environment: "TEST",
        });
        return client.isReadyToPay({
          ...baseRequest,
          allowedPaymentMethods: allowedPaymentMethods(),
        });
      })
      .then((ready: any) => {
        if (cancelled || !ready?.result) {
          if (!cancelled) setStatus("unsupported");
          return;
        }
        if (cancelled || !mountRef.current || !window.google) return;
        mountRef.current.innerHTML = "";
        const button = client.createButton({
          buttonColor: "black",
          buttonType: "subscribe",
          buttonSizeMode: "fill",
          onClick: async () => {
            if (!detailsReady) {
              onMissingDetails();
              throw new Error("details");
            }
            const transactionInfo = {
              totalPriceStatus: "FINAL",
              totalPrice: "99.00",
              currencyCode: "ZAR",
              countryCode: "ZA",
              totalPriceLabel: "180° All Access after trial",
            };
            try {
              const data = await client.loadPaymentData({
                ...baseRequest,
                allowedPaymentMethods: allowedPaymentMethods(),
                merchantInfo: { merchantName: "180 Degrees News" },
                transactionInfo,
              });
              const info = data?.paymentMethodData?.info ?? {};
              const details: string = info.cardDetails ?? "";
              const digits = details.replace(/\D/g, "");
              onAuthorized({
                last4: digits ? digits.slice(-4) : null,
                network: info.cardNetwork ?? "Card",
              });
            } catch (err: any) {
              if (err?.statusCode === "CANCELED") return; // user closed sheet
              onError("Google Pay was cancelled or is unavailable.");
              throw err;
            }
          },
        });
        mountRef.current.appendChild(button);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unsupported");
      });

    return () => {
      cancelled = true;
    };
    // Mount once per checkout session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-sm bg-slate-50 p-4">
      <div className="flex items-start gap-2 rounded-md bg-white p-3 text-xs font-medium text-slate-800 ring-1 ring-slate-200">
        <span className="text-base leading-none">🅖</span>
        <p>
          Google Pay saves your card to this browser. You start a{" "}
          <strong>7-day free trial</strong>; your first charge of{" "}
          <strong>R99</strong> happens only after the trial ends.
        </p>
      </div>

      <div className="mt-3 min-h-[56px]">
        {status === "loading" && (
          <div className="flex h-12 items-center justify-center rounded-md bg-indigo-100 text-xs font-bold text-indigo-900">
            Loading Google Pay…
          </div>
        )}
        <div ref={mountRef} className="[&_button]:h-12 [&_button]:w-full [&_button]:rounded-md" />
        {status === "unsupported" && (
          <div className="rounded-md border-2 border-slate-300 bg-white p-3 text-center">
            <p className="text-xs font-black text-slate-800">
              Google Pay isn&apos;t available in this browser.
            </p>
            <p className="mt-0.5 text-[0.72rem] font-medium text-slate-600">
              Use Google Chrome on a signed-in device, or pay another way
              below.
            </p>
          </div>
        )}
      </div>

      {busy && (
        <p className="mt-2 text-center text-xs font-black text-indigo-900">
          Activating your trial…
        </p>
      )}
    </div>
  );
}
