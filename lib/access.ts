import { getCurrentUser } from "@/lib/auth";

export async function hasFullAccess() {
  const user = await getCurrentUser();
  return Boolean(user?.paid);
}

export async function requireUser() {
  return getCurrentUser();
}
