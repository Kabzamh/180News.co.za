import { getAdForSlot } from "@/lib/ads";
import { StickyAd } from "@/components/StickyAd";

export async function StickyAdSlot() {
  const ad = await getAdForSlot("sticky-mobile");
  if (!ad) return null;
  return <StickyAd id={ad.id} advertiser={ad.advertiser} headline={ad.headline} cta={ad.cta} />;
}
