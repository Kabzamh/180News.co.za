import type { Metadata } from "next";
import { MONTHLY_PLAN, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using 180news.co.za, including subscriptions, trials and user comments.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Legal</p>
      <h1 className="mt-2 font-serif text-5xl">Terms of use</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700">
        <p>
          By using {SITE.domain} you agree to these terms. Headlines and teasers are free. Full articles, video and
          audio are for registered readers on a 7-day trial or a paid {MONTHLY_PLAN.label} Digital Bulletin.
        </p>
        <p>
          Lottery, load-shedding and fuel figures are for information only. Confirm official results with the National
          Lottery / Ithuba and Eskom. The National Lottery is for persons 18 years and older.
        </p>
        <p>
          Comments must not be defamatory, hateful or unlawful. We may remove copy and close accounts that break the
          law or these terms. Advertising is sold separately; see the advertise desk.
        </p>
        <p>
          {SITE.name} is based at {SITE.addressLines.join(", ")}. Contact {SITE.email}.
        </p>
      </div>
    </main>
  );
}
