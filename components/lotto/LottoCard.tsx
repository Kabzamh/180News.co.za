import LottoBalls from "@/components/lotto/LottoBalls";
import type { LottoGame } from "@/lib/lottery";
import type { LottoDraw } from "@/db/schema";
import { formatDate, rand } from "@/lib/utils";

export default function LottoCard({
  game,
  draw,
  detailed = false,
}: {
  game: LottoGame;
  draw?: LottoDraw;
  detailed?: boolean;
}) {
  if (!draw) {
    return (
      <article
        id={game.slug}
        className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm scroll-mt-32"
      >
        <Header game={game} />
        <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-sm bg-slate-50 text-center">
          <span className="text-3xl opacity-40">🎱</span>
          <p className="max-w-xs text-xs text-slate-500">
            The latest {game.name} result is being prepared. Draws take place{" "}
            {game.drawDays.toLowerCase()} at {game.drawTime}.
          </p>
        </div>
      </article>
    );
  }

  const top = draw.divisions?.[0];

  return (
    <article
      id={game.slug}
      className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm scroll-mt-32"
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-white"
        style={{
          background: `linear-gradient(100deg, ${game.ball}, #070e44)`,
        }}
      >
        <div>
          <h2 className="font-headline text-xl font-black uppercase tracking-wide">
            {game.name}
          </h2>
          <p className="text-[0.7rem] text-white/80">
            Draw {draw.drawNumber} · {formatDate(draw.drawDate)} ·{" "}
            {game.drawDays}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-white/75">
            Estimated jackpot
          </p>
          <p className="font-headline text-2xl font-black text-brand-gold">
            {rand(draw.jackpot, { compact: true })}
          </p>
        </div>
      </div>

      <div className="p-5">
        <LottoBalls
          numbers={draw.mainNumbers}
          bonus={draw.bonusNumber}
          ballColor={game.ball}
          bonusColor={game.specialBall}
          bonusLabel={game.specialLabel ?? ""}
          size="lg"
        />

        <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
          <Stat label="Prize pool" value={rand(draw.prizePool)} />
          <Stat
            label="Jackpot division"
            value={
              top
                ? `${top.winners.toLocaleString("en-ZA")} winner${
                    top.winners === 1 ? "" : "s"
                  }`
                : "—"
            }
          />
          <Stat label="Total winners" value={draw.totalWinners?.toLocaleString("en-ZA") ?? "—"} />
        </div>

        {top && top.winners === 0 && (
          <p className="mt-3 rounded-sm bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
            🎰 No ticket matched all {game.mainCount}
            {game.specialLabel ? ` numbers plus the ${game.specialLabel}` : ""}{" "}
            — the jackpot rolls over to the next draw.
          </p>
        )}
        {top && top.winners > 0 && top.prize > 0 && (
          <p className="mt-3 rounded-sm bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
            🎉 {top.winners.toLocaleString("en-ZA")} ticket{top.winners === 1 ? "" : "s"}{" "}
            won the {game.name} jackpot of {rand(top.prize)} each!
          </p>
        )}

        {detailed && draw.divisions?.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-sm border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2">Division</th>
                  <th className="px-3 py-2 text-right">Winners</th>
                  <th className="px-3 py-2 text-right">Prize per winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {draw.divisions.map((d, i) => (
                  <tr key={i} className={i === 0 ? "bg-amber-50/60 font-semibold" : ""}>
                    <td className="px-3 py-2">{d.match}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {d.winners.toLocaleString("en-ZA")}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {d.prize > 0 ? rand(d.prize) : "R 0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-3 text-[0.65rem] text-slate-400">
          {game.blurb} Played at {game.ticketCost}. Machine:{" "}
          {draw.drawMachine ?? "RNG"}.
        </p>
      </div>
    </article>
  );
}

function Header({ game }: { game: LottoGame }) {
  return (
    <div
      className="mb-3 flex items-center justify-between rounded-sm px-4 py-2.5 text-white"
      style={{ background: `linear-gradient(100deg, ${game.ball}, #070e44)` }}
    >
      <h2 className="font-headline text-xl font-black uppercase tracking-wide">
        {game.name}
      </h2>
      <span className="text-[0.7rem] text-white/80">
        {game.drawDays} · {game.drawTime}
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-slate-50 px-3 py-2">
      <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 font-bold text-ink">{value}</p>
    </div>
  );
}
