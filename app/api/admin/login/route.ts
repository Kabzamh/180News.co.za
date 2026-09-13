import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_COOKIE_OPTIONS, authenticateAdmin, createAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const admin = await authenticateAdmin(email, password);
  const url = new URL("/admin/login", request.url);
  if (!admin) {
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url);
  }
  const token = await createAdminSession(admin.id);
  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set(ADMIN_COOKIE, token, ADMIN_COOKIE_OPTIONS);
  return response;
}
