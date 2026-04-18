import { cookies } from "next/headers";
import { serverApiFetch } from "@/app/lib/api/server-api-client";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  try {
    const res = await serverApiFetch<{ user: { name: string; email: string; role: string } }>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return res.user;
  } catch {
    return null;
  }
}
