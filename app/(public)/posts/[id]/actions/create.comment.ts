"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/app/lib/api/axios-instance";
import { updateTag } from "next/cache";

export async function createCommentAction({ postId, content }: { postId: string; content: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) throw new Error("Unauthorized");
  const res = await apiClient.post(`/comments`, { postId, content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Update only comment tags
  await updateTag(`post:${postId}:comments`);
  return res.data;
}
