"use server";

import { cookies } from "next/headers";
import { apiClient } from "../../../lib/api/axios-instance";
import {  updateTag } from "next/cache";
import { CreatePostPayload } from "../../../lib/api/blog-api";

export async function createPostAction(payload: CreatePostPayload) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) throw new Error("Unauthorized");
  const res = await apiClient.post("/posts", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  updateTag("posts:list");
  return res.data;
}
