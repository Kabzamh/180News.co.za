import Link from "next/link";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import NewsletterForm from "@/components/NewsletterForm";
import { CATEGORIES, PROVINCES, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-12">
      {/* Newsletter band */}
      <div className="bg-brand-red text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-5 px-4 py-8 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-2xl font-black uppercase tracking-wide">
              Never miss a headline
            </h2>
            <p className="mt-1 text-sm text-white/85">
              Breaking news alerts, the morning briefing and weekend analysis —
              free, straight to your inbox.
            </p>
          </div>
          <NewsletterForm variant="dark" />
        </div>
      </div>

      {/* Link columns */}
      <div className="bg-brand-navy-dark text-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              {SITE.description}
            </p>
            <div className="mt-5">
              <p className="mb-2.5 text-xs font-black uppercase tracking-widest text-brand-gold">
                Follow the newsroom
              </p>
              <SocialIcons variant="dark" />
            </div>
            <p className="mt-4 text-xs text-white/50">
              180 Degrees News aggregates publicly available RSS feeds from
              South African newsrooms alongside original reporting. All rights
              in wire content remain with their respective owners.
            </p>
            <p className="mt-3 text-xs text-white/50">
              Tips &amp; press releases:{" "}
              <a href={`mailto:${SITE.email}`} className="text-white/80 underline">
                {SITE.email}
              </a>
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-brand-gold">
              Sections
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1.5 text-xs font-black uppercase text-indigo-950 hover:brightness-105"
                >
                  👑 7 days free · R99/mo
                </Link>
              </li>
              <li>
                <Link href="/premium" className="font-bold text-brand-gold hover:text-white">
                  Premium stories
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white">
                  My Account
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/section/${c.slug}`} className="hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/markets" className="font-bold text-brand-gold hover:text-white">
                  📈 Markets
                </Link>
              </li>
              <li>
                <Link href="/live" className="hover:text-white">
                  Live Wire
                </Link>
              </li>
              <li>
                <Link href="/watch" className="hover:text-white">
                  ▶ Watch
                </Link>
              </li>
              <li>
                <Link href="/listen" className="hover:text-white">
                  🎧 Listen
                </Link>
              </li>
              <li>
                <Link href="/horoscopes" className="hover:text-white">
                  ✦ Horoscopes
                </Link>
              </li>
              <li>
                <Link href="/lotto" className="font-bold text-brand-gold hover:text-white">
                  🎱 Lotto Results
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-brand-gold">
              Provinces
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {PROVINCES.slice(0, 9).map((p) => (
                <li key={p.slug}>
                  <Link href={`/province/${p.slug}`} className="hover:text-white">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-brand-gold">
              More
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/local" className="hover:text-white">
                  Regional &amp; Local
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white">
                  Newsroom Team
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-white">
                  News Sources
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-24 pt-4 text-xs text-white/60 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-start">
              <Link href="/app" className="font-bold text-brand-gold hover:underline">
                Get the app
              </Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/sources" className="hover:text-white">News Sources</Link>
              <Link href="/team" className="hover:text-white">Newsroom Team</Link>
            </div>
            <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
              <p>
                © {new Date().getFullYear()} {SITE.name}. All rights reserved.
              </p>
              <p>
                Made in South Africa 🇿🇦 · National · Provincial · Regional · Local
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
