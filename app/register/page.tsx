import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create a subscriber profile",
  description: "Register for 180 Degrees News and start a free 7-day trial of the full bulletin.",
};

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/account");

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Register</p>
      <h1 className="mt-2 font-serif text-5xl">Create your profile</h1>
      <p className="mt-3 text-slate-600">
        Open an account and start a 7-day free trial. After that it is R99 a month.
      </p>
      <div className="mt-8 border border-slate-200 bg-white p-6">
        <RegisterForm />
      </div>
    </main>
  );
}
