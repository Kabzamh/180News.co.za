import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-auth";
import AdminConsole from "@/components/admin/AdminConsole";
import AdminGate from "@/components/admin/AdminGate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsroom Console (restricted)",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Fast path: a valid session cookie renders the console immediately.
  // Otherwise the client gate handles login via cookie OR local key storage,
  // which keeps sign-in working in browsers that block/ isolate cookies.
  const authed = await isAdmin();
  return authed ? <AdminConsole /> : <AdminGate />;
}
