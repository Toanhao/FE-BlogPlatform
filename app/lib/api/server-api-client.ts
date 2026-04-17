export type ServerApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  cache?: RequestCache;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

function buildQueryString(
  params?: Record<string, string | number | boolean | undefined>,
): string {
  if (!params) return "";
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) usp.set(k, String(v));
  });
  const s = usp.toString();
  return s ? `?${s}` : "";
}

export async function serverApiFetch<T = unknown>(
  path: string,
  options: ServerApiFetchOptions = {},
): Promise<T> {
  const { method = "GET", params, body, headers = {}, next, cache } = options;

  const url = `${API_BASE_URL}${path}${buildQueryString(params)}`;

  const fetchOptions: RequestInit & {
    next?: { revalidate?: number; tags?: string[] };
  } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(next ? { next } : {}),
    ...(cache ? { cache } : {}),
  };

  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    let msg = "Server error";
    try {
      const data = await res.json();
      msg = data?.message || data?.error?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  const data = await res.json();
  console.log(`API response from ${url}:`);
  return data;
}
