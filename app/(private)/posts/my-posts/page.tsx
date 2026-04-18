import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostListItem } from "../../../lib/api/blog-api";
import MyPostsClient from "./my-posts-client";
import { apiClient } from "../../../lib/api/axios-instance";

type Post = PostListItem & {
  authorId?: string | number;
  image: string | null;
};

async function getCurrentUserIdFromApi(token: string): Promise<string> {
  const res = await apiClient.get<{ user: { id?: string | number } }>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const userId = String(res.data.user?.id ?? "").trim();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

async function getUserPostsFromApi(
  token: string,
  userId: string,
): Promise<Post[]> {
  const res = await apiClient.get<Post[]>(`/users/${userId}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default async function MyPostsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  let posts: Post[] = [];

  try {
    const myUserId = await getCurrentUserIdFromApi(token);
    posts = await getUserPostsFromApi(token, myUserId);
  } catch {
    redirect("/auth/login");
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Bài viết của tôi </h1>
      <MyPostsClient initialPosts={posts} />
    </div>
  );
}
