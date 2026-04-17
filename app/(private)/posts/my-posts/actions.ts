"use server";

import { cookies } from "next/headers";

import { apiClient } from "../../../lib/api/axios-instance";
import { updateTag } from "next/cache";

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

  try {
    await apiClient.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    updateTag("posts:list");
    return { ok: true };
  } catch (err: unknown) {
    if (err instanceof Error && err.message?.includes("Unauthorized")) {
      return { ok: false, error: "Unauthorized" };
    }
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Da co loi xay ra",
    };
  }
}
