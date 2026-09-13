import type { Metadata } from "next";
import { AdCreative } from "@/components/AdSlot";
import { ElectionsLive } from "@/components/ElectionsLive";
import { getAdForSlot } from "@/lib/ads";
import { getElectionDesk } from "@/lib/iec";

export const metadata: Metadata = {
  title: "IEC live results",
  description:
    "Live updates from the Electoral Commission of South Africa, including current by-elections and certified 2024 national results.",
};

export const dynamic = "force-dynamic";

export default async function ElectionsPage() {
  const [desk, promo] = await Promise.all([getElectionDesk(), getAdForSlot("elections-sidebar")]);
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {promo ? (
        <div className="mb-6 lg:hidden">
          <AdCreative ad={promo} />
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <ElectionsLive initial={desk} />
        {promo ? (
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <AdCreative ad={promo} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
