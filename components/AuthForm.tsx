"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Johannesburg");
  const [province, setProvince] = useState("Gauteng");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, city, province }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string; next?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not register.");
      router.push(data.next || "/subscribe");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not register.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Full name" value={name} onChange={setName} required />
      <Field label="Email" type="email" value={email} onChange={setEmail} required />
      <Field label="Password" type="password" value={password} onChange={setPassword} required />
      <Field label="Phone" value={phone} onChange={setPhone} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" value={city} onChange={setCity} />
        <Field label="Province" value={province} onChange={setProvince} />
      </div>
      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" required className="mt-1" />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="text-[#0b2f8a]">
            terms
          </Link>
          ,{" "}
          <Link href="/privacy" className="text-[#0b2f8a]">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/popia" className="text-[#0b2f8a]">
            POPIA notice
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        disabled={busy}
        className="bg-[#8f1520] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-60"
      >
        {busy ? "Creating profile..." : "Create profile"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <p className="text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/signin" className="font-semibold text-[#0b2f8a]">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not sign in.");
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Email" type="email" value={email} onChange={setEmail} required />
      <Field label="Password" type="password" value={password} onChange={setPassword} required />
      <button
        type="submit"
        disabled={busy}
        className="bg-[#0b2f8a] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-60"
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <p className="text-sm text-slate-600">
        New reader?{" "}
        <Link href="/register" className="font-semibold text-[#0b2f8a]">
          Create a profile
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 outline-none ring-[#0b2f8a] focus:ring-2"
      />
    </label>
  );
}
