import type { ReactNode } from "react";
import { headers } from "next/headers";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreakingBar } from "@/components/BreakingBar";
import { AnalyticsCollector } from "@/components/AnalyticsCollector";
import { CookieNotice } from "@/components/CookieNotice";
import { MobileDock } from "@/components/MobileDock";
import { StickyAdSlot } from "@/components/StickyAdSlot";
import { getCurrentUser } from "@/lib/auth";
import { getBreakingHeadlines, getNavigationData } from "@/lib/queries";
import { formatLongDate } from "@/lib/utils";

export async function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "";
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return <>{children}</>;
  }

  const [{ categories, provinces }, breaking, user] = await Promise.all([
    getNavigationData(),
    getBreakingHeadlines(),
    getCurrentUser(),
  ]);

  return (
    <>
      <Header
        dateLabel={formatLongDate()}
        provinces={provinces}
        categories={categories}
        auth={user ? { name: user.name, paid: user.paid } : null}
      />
      <BreakingBar items={breaking} />
      <div className="border-b border-slate-200 bg-[#ece7dc]">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <AdSlot slot="top-leaderboard" compact />
        </div>
      </div>
      {children}
      <div className="bg-[#ece7dc] pb-6">
        <div className="mx-auto max-w-7xl px-4 pt-8">
          <AdSlot slot="footer-billboard" />
        </div>
      </div>
      <Footer provinces={provinces} />
      <StickyAdSlot />
      <MobileDock auth={user ? { name: user.name, paid: user.paid } : null} />
      <AnalyticsCollector />
      <CookieNotice />
    </>
  );
}
