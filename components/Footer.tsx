import Link from "next/link";
import { FOOTER_LINKS, NAV_LINKS, SITE } from "@/lib/constants";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialLinks } from "@/components/SocialLinks";
import type { Province } from "@/db/schema";

export function Footer({ provinces }: { provinces: Province[] }) {
  return (
    <footer className="mt-16 bg-[#081226] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.png" alt="180 Degrees News" className="h-16 w-auto bg-white p-2" />
          <p className="mt-4 font-serif text-2xl">180 Degrees News</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-white/70">
            {SITE.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-3 text-sm text-white/80">
            {SITE.phone}
            <br />
            {SITE.email}
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#f0c7cb]">Follow 180°</p>
          <div className="mt-3">
            <SocialLinks variant="dark" compact />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0c7cb]">Sections</p>
          <div className="mt-4 grid gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0c7cb]">Nine provinces</p>
          <div className="mt-4 grid gap-2 text-sm">
            {provinces.map((province) => (
              <Link
                key={province.slug}
                href={`/province/${province.slug}`}
                className="text-white/80 hover:text-white"
              >
                {province.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0c7cb]">Daily bulletin</p>
          <p className="mt-3 text-sm text-white/70">
            Get national, provincial and international headlines from the Johannesburg newsroom.
          </p>
          <div className="mt-4">
            <NewsletterForm variant="dark" />
          </div>
          <div className="mt-6 grid gap-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} 180 Degrees News · {SITE.domain}</p>
          <p>Office based in Johannesburg · Covering all news topics</p>
        </div>
      </div>
    </footer>
  );
}
