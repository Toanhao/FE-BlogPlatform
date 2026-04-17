export type StoredUser = {
  id?: string | number;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
};

const USER_KEY = "user";
const AUTH_CHANGED_EVENT = "auth-changed";

const isBrowser = () => typeof window !== "undefined";

export function getStoredUser(): StoredUser | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function saveAuthSession(user: StoredUser) {
  if (!isBrowser()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearAuthSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}
