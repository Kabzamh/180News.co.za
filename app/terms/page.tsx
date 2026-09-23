import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the 180 Degrees News website and mobile applications.",
  alternates: { canonical: "/terms" },
};

const EFFECTIVE = "15 September 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-red">
        Legal
      </p>
      <h1 className="font-headline mt-1 text-3xl font-black uppercase text-brand-navy sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Effective {EFFECTIVE}</p>

      <div className="article-body mt-6">
        <p>
          These terms govern your use of the 180 Degrees News website, mobile
          applications and related services (the “Service”), operated in
          South Africa. By using the Service you agree to these terms.
        </p>

        <h2>1. The Service</h2>
        <p>
          We publish national, provincial and local South African news,
          wire-aggregated reports, original journalism, results, markets
          data, audio and video. Wire reports are attributed to their
          originating newsrooms and linked to the source.
        </p>

        <h2>2. Accounts and 180° All Access</h2>
        <p>
          Some content sits behind a membership. A membership includes a
          seven-day free trial followed by a recurring monthly fee
          (currently R99), billed through your selected payment method —
          card, Google Pay, Instant EFT or debit order on the website, and
          through Apple App Store or Google Play billing in the mobile apps
          where those platforms require it. You can cancel any time in My
          Account; trial cancellations incur no charge, and paid
          memberships remain active until the end of the billed period.
        </p>

        <h2>3. Acceptable use</h2>
        <p>
          You may not scrape, redistribute, resell, republish or
          systematically copy premium content, share membership
          credentials for commercial use, attempt to bypass access
          controls, or upload unlawful material to the newsroom. Newsroom
          accounts are for authorised staff.
        </p>

        <h2>4. Intellectual property</h2>
        <p>
          Original 180° text, graphics and code are owned by us or our
          licensors. Third-party photographs, video, audio, trademarks and
          wire articles remain the property of their respective owners and
          are used under the stated terms.
        </p>

        <h2>5. Advertising and third parties</h2>
        <p>
          The free Service displays advertising and embeds third-party
          players. We are not responsible for external websites,
          advertisers’ offers, or content hosted on YouTube, podcast hosts
          or linked platforms.
        </p>

        <h2>6. Availability and accuracy</h2>
        <p>
          Results, markets data and wire content are provided “as is” and
          may be delayed or contain errors. We do not provide financial,
          medical, legal or betting advice; horoscopes and results are for
          information and entertainment.
        </p>

        <h2>7. Liability</h2>
        <p>
          To the extent permitted by South African law, we are not liable
          for indirect or consequential loss arising from use of the
          Service or its unavailability. Nothing in these terms limits
          liability that cannot lawfully be limited.
        </p>

        <h2>8. Cancellation &amp; refunds</h2>
        <p>
          You can cancel under your store subscription settings (for
          in-app purchases) or in{" "}
          <Link className="font-bold text-brand-red" href="/account">
            My Account
          </Link>
          . Billing errors are refunded on request; other refunds follow
          the Consumer Protection Act and the relevant store policy.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may suspend accounts that breach these terms or engage in
          fraud. On termination your access to premium content ends when
          the billing period closes.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of the Republic of South
          Africa. Disputes are subject to the jurisdiction of the South
          African courts.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions and account requests:{" "}
          <a className="font-bold text-brand-red" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          . See also our{" "}
          <Link className="font-bold text-brand-red" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
