import { getAllAds } from "@/lib/ads";
import { cpmRevenueCents } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default async function AdminAdsPage() {
  const rows = await getAllAds();
  return (
    <div>
      <h1 className="font-serif text-4xl">Advertising</h1>
      <p className="mt-2 text-sm text-white/50">
        Booked CPM is the rate per thousand impressions. Revenue = impressions ÷ 1 000 × CPM.
      </p>
      <div className="mt-6 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.12em] text-white/50">
            <tr>
              <th className="px-3 py-2">Advertiser</th>
              <th className="px-3 py-2">Slot</th>
              <th className="px-3 py-2">Impressions</th>
              <th className="px-3 py-2">Clicks</th>
              <th className="px-3 py-2">CTR</th>
              <th className="px-3 py-2">CPM</th>
              <th className="px-3 py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const ctr = row.impressions > 0 ? (row.clicks / row.impressions) * 100 : 0;
              const revenue = cpmRevenueCents(row.impressions, row.cpmCents);
              return (
                <tr key={row.id} className="border-t border-white/10">
                  <td className="px-3 py-3">
                    {row.advertiser}
                    <p className="text-xs text-white/40">{row.headline}</p>
                  </td>
                  <td className="px-3 py-3">{row.slot}</td>
                  <td className="px-3 py-3">{row.impressions.toLocaleString("en-ZA")}</td>
                  <td className="px-3 py-3">{row.clicks.toLocaleString("en-ZA")}</td>
                  <td className="px-3 py-3">{ctr.toFixed(2)}%</td>
                  <td className="px-3 py-3">R{(row.cpmCents / 100).toFixed(0)}</td>
                  <td className="px-3 py-3">R{(revenue / 100).toFixed(0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
