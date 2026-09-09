/**
 * Base URL of the backend API. Empty string means same-origin (relative
 * paths like "/api/enquiries"), which works with the Vite dev proxy in
 * development and with same-origin deploys in production. Set
 * VITE_API_URL to point at a separately-hosted backend instead.
 */
export const API_BASE = import.meta.env.VITE_API_URL || "";

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}
