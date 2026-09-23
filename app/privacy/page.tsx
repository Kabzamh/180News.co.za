import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How 180 Degrees News collects, uses and protects your personal information (POPIA).",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "15 September 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-red">
        Legal
      </p>
      <h1 className="font-headline mt-1 text-3xl font-black uppercase text-brand-navy sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Effective {EFFECTIVE}</p>

      <div className="article-body mt-6">
        <p>
          180 Degrees News (“<strong>we</strong>”, “<strong>us</strong>”, “
          <strong>180°</strong>”) is a South African news service. This
          policy explains what personal information we collect when you use{" "}
          {SITE.url} and our mobile applications, why we collect it, and your
          rights under the Protection of Personal Information Act, 2013
          (“POPIA”).
        </p>

        <h2>1. What we collect</h2>
        <ul>
          <li>
            <strong>Account &amp; subscription data:</strong> your email
            address, display name, chosen payment method label and card
            last-four digits, trial and billing dates, and a signed session
            token, if you create an All Access membership.
          </li>
          <li>
            <strong>Newsletter data:</strong> your email address if you sign
            up for a free newsletter.
          </li>
          <li>
            <strong>Usage data:</strong> pages and articles viewed, article
            views, ad impressions and ad clicks, approximate region, browser
            and device type, and diagnostic logs.
          </li>
          <li>
            <strong>Media you submit:</strong> images, audio or video you
            upload to the newsroom (restricted to authorised staff).
          </li>
        </ul>

        <h2>2. How we use it</h2>
        <ul>
          <li>to deliver the news, paywalled content and your subscription;</li>
          <li>to process free trials and recurring access to 180° All Access;</li>
          <li>to measure and bill advertising shown on the service;</li>
          <li>to keep the service secure, prevent fraud and debug issues;</li>
          <li>to send newsletters and service notices you have requested.</li>
        </ul>

        <h2>3. Payments</h2>
        <p>
          Card, Instant EFT, debit-order and Google Pay checkouts are processed
          by licensed South African payment service providers. We do not store
          full card numbers; only the card brand and last four digits are
          retained. In native mobile apps, subscriptions are processed through
          Apple App Store and Google Play billing where required by the
          platform rules; their own privacy policies also apply.
        </p>

        <h2>4. Advertising</h2>
        <p>
          We serve first-party house and sponsor banners and count
          impressions and clicks. We do not, on our own service, build
          cross-site advertising profiles. Embedded third-party players
          (YouTube videos and podcast hosts) may set their own cookies when you
          press play; please review those providers’ policies.
        </p>

        <h2>5. Cookies &amp; local storage</h2>
        <p>
          We use strictly necessary httpOnly cookies for your subscription and
          newsroom session, local storage for optional sign-in on restricted
          browsers, and a service worker for offline reading. You can clear
          these in your browser or app settings, though some features (for
          example premium access) will then stop working.
        </p>

        <h2>6. Sharing your information</h2>
        <p>
          We share information only with payment processors, hosting and
          infrastructure providers, our email provider, and where required by
          law or a competent authority. We do not sell your personal
          information.
        </p>

        <h2>7. Retention &amp; deletion</h2>
        <p>
          We keep subscription records while your membership is active and for
          the period required for tax and consumer law. You can request export
          or deletion of your account and personal information at any time by
          emailing{" "}
          <a className="font-bold text-brand-red" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          ; you may also cancel your membership in{" "}
          <Link className="font-bold text-brand-red" href="/account">
            My Account
          </Link>
          .
        </p>

        <h2>8. Your POPIA rights</h2>
        <p>
          You may request access to, correction of, or deletion of your
          personal information, object to certain processing, or withdraw
          consent, by contacting our Information Officer. We will respond
          within the statutory period.
        </p>
        <p>
          <strong>Information Officer:</strong> Editor, 180 Degrees News,{" "}
          <a className="font-bold text-brand-red" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>

        <h2>9. Children</h2>
        <p>
          The service provides general news and is not directed at children
          under 16; we do not knowingly collect their personal information.
        </p>

        <h2>10. Changes</h2>
        <p>
          We may update this policy; material changes will be noted on this
          page with a revised effective date.
        </p>

        <div className="mt-8 rounded-sm bg-slate-50 p-4 text-sm">
          Questions? Email{" "}
          <a className="font-bold text-brand-red" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </div>
      </div>
    </div>
  );
}
