import type { Metadata } from "next";
import Link from "next/link";
import { getAuthors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Our journalists",
  description: "Meet the 180 Degrees News reporters covering South Africa and the world from Johannesburg.",
};

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const people = await getAuthors();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Newsroom</p>
      <h1 className="mt-2 font-serif text-5xl">Our journalists</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        The 180 Degrees News desk in Johannesburg, covering national, provincial and international affairs.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {people.map((author) => (
          <Link
            key={author.id}
            href={`/author/${author.slug}`}
            className="border border-slate-200 bg-white p-5 hover:border-[#0b2f8a]"
          >
            <div className="flex h-14 w-14 items-center justify-center bg-[#8f1520] font-serif text-xl text-white">
              {author.avatarInitials}
            </div>
            <h2 className="mt-4 font-serif text-2xl">{author.name}</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#0b2f8a]">{author.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{author.bio}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
