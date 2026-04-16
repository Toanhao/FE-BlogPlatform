import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostListItem } from "@/lib/api/blog-api";
import MyPostsClient from "./my-posts-client";

type Post = PostListItem & {
  authorId?: string | number;
  image: string | null;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

async function getCurrentUserIdFromApi(token: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  const profile = (await response.json()) as { id?: string | number };
  const userId = String(profile.id ?? "").trim();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}

async function getUserPostsFromApi(token: string, userId: string): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return (await response.json()) as Post[];
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
