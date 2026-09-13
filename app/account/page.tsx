import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountPanel } from "@/components/AccountPanel";
import { getAccountBundle } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Manage your 180 Degrees News subscriber profile and monthly payment.",
};

export const dynamic = "force-dynamic";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string; trial?: string }>;
}) {
  const bundle = await getAccountBundle();
  if (!bundle) redirect("/signin");
  const { paid, trial } = await searchParams;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Account</p>
      <h1 className="mt-2 font-serif text-5xl">Hello, {bundle.user.name.split(" ")[0]}</h1>
      {trial ? (
        <p className="mt-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Your 7-day free trial is on. Full stories, video and MP3 are unlocked until the trial ends.
        </p>
      ) : null}
      {paid ? (
        <p className="mt-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Payment {paid} received. Your Digital Bulletin month is open.
        </p>
      ) : null}
      <div className="mt-8">
        <AccountPanel user={bundle.user} payments={bundle.payments} />
      </div>
      <p className="mt-8 text-sm">
        <Link href="/" className="font-semibold text-[#0b2f8a]">
          Back to the bulletin →
        </Link>
      </p>
    </main>
  );
}
