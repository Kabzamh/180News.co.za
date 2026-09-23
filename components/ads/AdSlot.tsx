import type { AdPlacement } from "@/db/schema";
import { getAdForPlacement, placementMeta } from "@/lib/ads";
import AdClient from "@/components/ads/AdClient";

export default async function AdSlot({
  placement,
  className = "",
}: {
  placement: AdPlacement;
  className?: string;
}) {
  // Slight per-request randomness for rotation; null when no campaign booked.
  const ad = await getAdForPlacement(placement, Math.random());
  if (!ad) return null;

  const meta = placementMeta(placement);
  return (
    <AdClient
      id={ad.id}
      name={ad.name}
      type={ad.type}
      imageUrl={ad.imageUrl}
      html={ad.html}
      linkUrl={ad.linkUrl ? `/api/ads/click/${ad.id}` : null}
      sponsor={ad.sponsor}
      placement={placement}
      width={meta?.width}
      height={meta?.height}
      className={className}
    />
  );
}
