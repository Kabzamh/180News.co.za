import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact the newsroom",
  description: "Write to the 180 Degrees News desk in Johannesburg with tips, corrections and queries.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_1fr]">
      <section>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Contact</p>
        <h1 className="mt-2 font-serif text-5xl">Write to the newsroom</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">
          Story tips, corrections, provincial dispatches and partnership queries all come through this desk in
          Johannesburg.
        </p>
        <div className="mt-8 space-y-5 text-sm leading-7">
          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">Office</p>
            <p>
              {SITE.name}
              <br />
              {SITE.addressLines.join(", ")}
            </p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">Desk</p>
            <p>
              {SITE.phone}
              <br />
              {SITE.email}
              <br />
              {SITE.tipsEmail}
            </p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">Hours</p>
            <p>Newsdesk: 06:00–22:00 SAST, seven days. The bulletin does not sleep on Sundays.</p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">Social</p>
            <p className="mb-3">Follow the Johannesburg desk:</p>
            <SocialLinks />
          </div>
        </div>
      </section>
      <section className="border border-slate-200 bg-white p-6">
        <ContactForm />
      </section>
    </main>
  );
}
