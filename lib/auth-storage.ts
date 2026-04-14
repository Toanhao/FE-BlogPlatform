export type StoredUser = {
  id?: string | number;
  _id?: string | number;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
};

const TOKEN_KEY = "token";
const USER_KEY = "user";
const AUTH_CHANGED_EVENT = "auth-changed";

const isBrowser = () => typeof window !== "undefined";

export function getToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): StoredUser | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function getCurrentUserId(): string {
  const user = getStoredUser();
  return String(user?.id ?? user?._id ?? "");
}

export function getAuthSnapshot() {
  const token = getToken();
  const user = getStoredUser();

  return {
    isAuth: Boolean(token),
    username: user?.name ?? user?.username ?? null,
  };
}

export function saveAuthSession(token: string, user: StoredUser) {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearAuthSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}
