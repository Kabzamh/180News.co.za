import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { LottoLive } from "@/components/LottoLive";
import { getLottoDesk } from "@/lib/lotto";

export const metadata: Metadata = {
  title: "Live lotto results",
  description:
    "Latest South African National Lottery results for Daily Lotto, Lotto, Lotto Plus, PowerBall and PowerBall XTRA.",
};

export const dynamic = "force-dynamic";

export default async function LottoPage() {
  const desk = await getLottoDesk();
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <AdSlot slot="mid-leaderboard" compact />
      </div>
      <LottoLive initial={desk} />
    </main>
  );
}
