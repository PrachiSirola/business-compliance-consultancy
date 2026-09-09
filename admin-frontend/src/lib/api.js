export const API_BASE = import.meta.env.VITE_API_URL || "";

const TOKEN_KEY = "suits_admin_token";

// Token lives in localStorage when "Remember me" was checked (survives
// browser restarts) or sessionStorage otherwise (cleared when the browser
// fully closes). Only one of the two ever holds a token at a time.
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}
export function setToken(token, remember) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
  }
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearToken();
    // Full reload so the app resets to the login screen cleanly.
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Session expired");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  login: (email, password, rememberMe) =>
    request("/api/auth/login", { method: "POST", body: { email, password, rememberMe }, auth: false }),
  me: () => request("/api/auth/me"),
  forgotPassword: (email) =>
    request("/api/auth/forgot-password", { method: "POST", body: { email }, auth: false }),
  resetPassword: (token, newPassword, confirmPassword) =>
    request("/api/auth/reset-password", {
      method: "POST",
      body: { token, newPassword, confirmPassword },
      auth: false,
    }),

  stats: () => request("/api/admin/stats"),

  listEnquiries: (params) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== ""))
    ).toString();
    return request(`/api/admin/enquiries${qs ? `?${qs}` : ""}`);
  },
  getEnquiry: (id) => request(`/api/admin/enquiries/${id}`),
  updateEnquiry: (id, body) => request(`/api/admin/enquiries/${id}`, { method: "PATCH", body }),
  addNote: (id, text) => request(`/api/admin/enquiries/${id}/notes`, { method: "POST", body: { text } }),
  deleteEnquiry: (id) => request(`/api/admin/enquiries/${id}`, { method: "DELETE" }),
};