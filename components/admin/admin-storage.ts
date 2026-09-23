"use client";

/**
 * Fallback credential storage for environments where the session cookie is
 * blocked/isolated (embedded or sandboxed preview browsers). The key is sent
 * as the x-admin-key header that every protected API already accepts.
 */
export const ADMIN_KEY_STORAGE = "180_admin_key";

export function getAdminKey(): string | null {
  try {
    return localStorage.getItem(ADMIN_KEY_STORAGE);
  } catch {
    return null;
  }
}

export function setAdminKey(key: string): void {
  try {
    localStorage.setItem(ADMIN_KEY_STORAGE, key.trim());
  } catch {
    /* storage unavailable — cookie path still attempted */
  }
}

export function clearAdminKey(): void {
  try {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
  } catch {
    /* ignore */
  }
}

export function adminHeaders(extra?: HeadersInit): HeadersInit {
  const key = getAdminKey();
  const headers = new Headers(extra ?? {});
  if (key) headers.set("x-admin-key", key);
  return headers;
}
