import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your 180 Degrees News subscriber profile.",
};

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/account");

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Sign in</p>
      <h1 className="mt-2 font-serif text-5xl">Welcome back</h1>
      <p className="mt-3 text-slate-600">Use the email and password on your subscriber profile.</p>
      <div className="mt-8 border border-slate-200 bg-white p-6">
        <SignInForm />
      </div>
    </main>
  );
}
