import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How 180 Degrees News collects, uses and protects personal information under POPIA.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Legal</p>
      <h1 className="mt-2 font-serif text-5xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-slate-500">180 Degrees News · {SITE.domain} · Johannesburg</p>
      <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700">
        <p>
          We collect the name, email, phone, city and payment references you give us when you register, subscribe,
          comment, contact the desk or join the newsletter. We use that information to run your account, take
          subscription fees, send the bulletin you asked for, and keep the site secure.
        </p>
        <p>
          Article views, device type and advertising impressions are stored to understand readership and CPM
          performance. We do not sell your personal information. Card numbers are not stored; we keep only brand and
          last four digits when a test or gateway payment is completed.
        </p>
        <p>
          You may ask for access, correction or deletion of your profile by writing to {SITE.email}. The responsible
          party is {SITE.name}, {SITE.addressLines.join(", ")}.
        </p>
        <p>
          This policy is issued under the Protection of Personal Information Act 4 of 2013 (POPIA). See also our{" "}
          <a href="/terms" className="text-[#0b2f8a]">
            terms
          </a>{" "}
          and{" "}
          <a href="/popia" className="text-[#0b2f8a]">
            POPIA notice
          </a>
          .
        </p>
      </div>
    </main>
  );
}
