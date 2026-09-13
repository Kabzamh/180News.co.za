import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin";

export const metadata: Metadata = { title: "Staff sign in" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center bg-[#081226] px-4 text-white">
      <div className="w-full max-w-md border border-white/10 bg-[#0e1320] p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">180° News</p>
        <h1 className="mt-2 font-serif text-4xl">Staff desk</h1>
        <p className="mt-2 text-sm text-white/60">Sign in to file copy, moderate comments and see subscribers.</p>
        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <label className="block text-sm">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </label>
          <button type="submit" className="w-full bg-[#8f1520] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em]">
            Sign in
          </button>
        </form>
        <p className="mt-4 text-xs text-white/40">Staff credentials are not published on this page. Set ADMIN_EMAIL and ADMIN_PASSWORD in production.</p>
      </div>
    </main>
  );
}
