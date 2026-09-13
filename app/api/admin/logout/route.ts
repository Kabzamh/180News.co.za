import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, destroyAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (token) await destroyAdminSession(token);
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
