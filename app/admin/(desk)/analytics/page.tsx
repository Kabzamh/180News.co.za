import { getAnalyticsReport } from "@/lib/analytics";

export const dynamic = "force-dynamic";

function rand(cents: number) {
  return `R${(cents / 100).toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;
}

export default async function AdminAnalyticsPage() {
  const report = await getAnalyticsReport();
  const maxDay = Math.max(...report.byDay.map((row) => row.hits), 1);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl">Performance & CPM</h1>
        <p className="mt-2 text-sm text-white/60">
          Live page views, Core Web Vitals, article reach and advertising yield at booked CPM.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Page views (7d)", value: report.pageViews7.toLocaleString("en-ZA") },
          { label: "Sessions (7d)", value: report.sessions7.toLocaleString("en-ZA") },
          { label: "Pages / session", value: report.pagesPerSession.toFixed(1) },
          { label: "Ad impressions", value: report.adImpressions.toLocaleString("en-ZA") },
          { label: "Ad clicks", value: report.adClicks.toLocaleString("en-ZA") },
          { label: "CTR", value: `${report.adCtr.toFixed(2)}%` },
          { label: "Avg CPM", value: rand(report.avgCpm) },
          { label: "Ad revenue", value: rand(report.adRevenue) },
          { label: "Sub revenue", value: rand(report.subRevenue) },
          { label: "Total yield", value: rand(report.totalRevenue) },
        ].map((card) => (
          <div key={card.label} className="border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">{card.label}</p>
            <p className="mt-2 font-serif text-3xl">{card.value}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-serif text-2xl">Traffic · 14 days</h2>
        <div className="mt-4 flex h-40 items-end gap-1 border border-white/10 bg-white/5 p-3">
          {report.byDay.map((row) => (
            <div key={row.day} className="flex flex-1 flex-col items-center justify-end gap-1">
              <div
                className="w-full bg-[#8f1520]"
                style={{ height: `${Math.max(6, (row.hits / maxDay) * 100)}%` }}
                title={`${row.day}: ${row.hits}`}
              />
              <span className="text-[9px] text-white/40">{row.day.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">Top pages (7d)</h2>
          <div className="mt-3 divide-y divide-white/10 border border-white/10">
            {report.topPages.map((row) => (
              <div key={row.path} className="flex justify-between px-3 py-2 text-sm">
                <span className="truncate pr-3">{row.path}</span>
                <span className="text-white/60">{row.hits}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl">Devices</h2>
          <div className="mt-3 space-y-3 border border-white/10 p-4">
            {Object.entries(report.deviceCounts).map(([device, value]) => {
              const total = report.pageViews7 || 1;
              return (
                <div key={device}>
                  <div className="flex justify-between text-sm capitalize">
                    <span>{device}</span>
                    <span>{value}</span>
                  </div>
                  <div className="mt-1 h-2 bg-white/10">
                    <div className="h-2 bg-[#0b2f8a]" style={{ width: `${(value / total) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <h2 className="mt-8 font-serif text-2xl">Web Vitals</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {report.vitals.map((vital) => (
              <div key={vital.name} className="border border-white/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">{vital.name}</p>
                <p className={`mt-1 font-serif text-2xl ${vital.good ? "text-emerald-300" : "text-amber-300"}`}>
                  {vital.name === "CLS" ? (vital.avg / 100).toFixed(2) : vital.avg}
                </p>
                <p className="text-xs text-white/40">
                  {vital.unit} · {vital.samples} samples · {vital.good ? "good" : "needs work"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl">CPM inventory</h2>
        <p className="mt-1 text-sm text-white/50">
          Revenue = impressions ÷ 1 000 × booked CPM. eCPM is the same yield expressed per thousand served.
        </p>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.12em] text-white/50">
              <tr>
                <th className="px-3 py-2">Advertiser</th>
                <th className="px-3 py-2">Slot</th>
                <th className="px-3 py-2">Impr.</th>
                <th className="px-3 py-2">Clicks</th>
                <th className="px-3 py-2">CTR</th>
                <th className="px-3 py-2">CPM</th>
                <th className="px-3 py-2">eCPM</th>
                <th className="px-3 py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {report.ads.map((ad) => (
                <tr key={ad.id} className="border-t border-white/10">
                  <td className="px-3 py-3">
                    {ad.advertiser}
                    <p className="text-xs text-white/40">{ad.format}</p>
                  </td>
                  <td className="px-3 py-3">{ad.slot}</td>
                  <td className="px-3 py-3">{ad.impressions.toLocaleString("en-ZA")}</td>
                  <td className="px-3 py-3">{ad.clicks.toLocaleString("en-ZA")}</td>
                  <td className="px-3 py-3">{ad.ctr.toFixed(2)}%</td>
                  <td className="px-3 py-3">{rand(ad.cpmCents)}</td>
                  <td className="px-3 py-3">{rand(Math.round(ad.ecpm))}</td>
                  <td className="px-3 py-3">{rand(ad.revenueCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl">Article performance</h2>
        <div className="mt-3 divide-y divide-white/10 border border-white/10">
          {report.articles.map((article) => (
            <div key={article.slug} className="flex justify-between px-3 py-2 text-sm">
              <span className="truncate pr-4">{article.title}</span>
              <span className="text-white/60">{article.views.toLocaleString("en-ZA")} views</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
