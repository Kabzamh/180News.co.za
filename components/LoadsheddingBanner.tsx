import Link from "next/link";
import { getLoadsheddingStage, stageCopy } from "@/lib/loadshedding";

export async function LoadsheddingBanner() {
  const stage = await getLoadsheddingStage();
  const copy = stageCopy(stage);
  return (
    <Link
      href="/loadshedding"
      className={`block px-4 py-2 text-center text-sm font-semibold text-white ${
        stage > 0 ? "bg-[#8f1520]" : "bg-[#1d5c32]"
      }`}
    >
      {copy.headline} · Check your area schedule →
    </Link>
  );
}
