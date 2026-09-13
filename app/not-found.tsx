import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">404</p>
      <h1 className="mt-3 font-serif text-5xl">This story is not on the bulletin.</h1>
      <p className="mt-4 text-slate-600">
        The page may have moved, or the slug is wrong. Return to the Johannesburg newsroom homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-[#0b2f8a] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
      >
        Back to 180° News
      </Link>
    </main>
  );
}
