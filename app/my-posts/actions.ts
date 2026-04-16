"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

type DeletePostActionResult = {
  ok: boolean;
  error?: string;
};

export async function deleteMyPostAction(
  postId: string,
): Promise<DeletePostActionResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return { ok: false, error: "Unauthorized" };
  }

  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.ok) {
    return { ok: true };
  }

  if (response.status === 401) {
    return { ok: false, error: "Unauthorized" };
  }

  const message = await response.text();
  return {
    ok: false,
    error: message || "Da co loi xay ra",
  };
}