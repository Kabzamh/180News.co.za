import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "POPIA notice",
  description: "Information regulator notice for 180 Degrees News readers in South Africa.",
};

export default function PopiaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Legal</p>
      <h1 className="mt-2 font-serif text-5xl">POPIA notice</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700">
        <p>
          180 Degrees News processes personal information as a responsible party under POPIA. The purpose is to
          provide news, operate subscriptions, answer queries and measure site performance.
        </p>
        <p>
          Information is stored on our hosting and database providers. We keep it only as long as your account is
          active or as the law requires. You may object to marketing mail and still keep a paid account.
        </p>
        <p>
          Complaints may be sent to {SITE.email} or to the Information Regulator (South Africa). Office:{" "}
          {SITE.addressLines.join(", ")}.
        </p>
      </div>
    </main>
  );
}
