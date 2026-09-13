import Link from "next/link";
import type { ReactNode } from "react";
import type { Admin } from "@/db/schema";

const LINKS = [
  { href: "/admin", label: "Desk" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/articles/new", label: "New story" },
  { href: "/admin/media", label: "Newsroom media" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/inbox", label: "Inbox" },
  { href: "/admin/ads", label: "Ads" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/golive", label: "Go live" },
];

export function AdminShell({ admin, children }: { admin: Admin; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0e1320] text-slate-100">
      <header className="border-b border-white/10 bg-[#081226]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">Staff desk</p>
            <p className="font-serif text-2xl">180° Admin</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/60">{admin.name}</span>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-xs uppercase tracking-[0.14em] text-[#f0c7cb]">
                Sign out
              </button>
            </form>
            <Link href="/" className="text-xs uppercase tracking-[0.14em] text-white/70">
              Public site
            </Link>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 pb-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </div>
  );
}
