import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { getAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminDeskLayout({ children }: { children: ReactNode }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell admin={admin}>{children}</AdminShell>;
}
