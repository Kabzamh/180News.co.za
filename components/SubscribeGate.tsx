import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { MONTHLY_PLAN } from "@/lib/constants";

export async function SubscribeGate() {
  const user = await getCurrentUser();

  return (
    <div className="relative">
      <div className="pointer-events-none h-24 bg-gradient-to-b from-transparent to-[#f4f0e8]" />
      <div className="-mt-8 border border-[#8f1520]/20 bg-white p-6 shadow-[0_16px_40px_rgba(16,24,40,0.08)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f1520]">Subscribers only</p>
        <h2 className="mt-2 font-serif text-3xl">The rest of this story is for subscribers.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Register for a free 7-day trial to read the full report, play video and MP3, and join comments. After the
          trial it is {MONTHLY_PLAN.label}.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {user ? (
            <Link href="/subscribe" className="bg-[#8f1520] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white">
              {user.onTrial ? "Keep access after trial" : `Pay ${MONTHLY_PLAN.label}`}
            </Link>
          ) : (
            <>
              <Link href="/register" className="bg-[#8f1520] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white">
                Start 7-day trial
              </Link>
              <Link href="/signin" className="border border-slate-300 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em]">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
