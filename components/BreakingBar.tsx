import Link from "next/link";

export function BreakingBar({
  items,
}: {
  items: Array<{ title: string; slug: string }>;
}) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <div className="border-y border-[#6d0f18] bg-[#8f1520] text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center bg-[#6d0f18] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]">
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-10 py-2 pr-10">
            {loop.map((item, index) => (
              <Link
                key={`${item.slug}-${index}`}
                href={`/article/${item.slug}`}
                className="whitespace-nowrap text-sm hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
