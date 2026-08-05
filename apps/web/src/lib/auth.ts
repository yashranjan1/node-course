const TOKEN_KEY = "token";
const USER_ID = "user"

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export function getId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(USER_ID);
}

export function setId(id: string) {
  window.localStorage.setItem(USER_ID, id);
}

export function clearId() {
  window.localStorage.removeItem(USER_ID);
}