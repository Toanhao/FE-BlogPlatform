"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "@/app/components/post-card";
import { deletePostById, getUserPosts, PostListItem } from "@/lib/api/blog-api";
import { getCurrentUserId } from "@/lib/auth-storage";

type Post = PostListItem & {
  authorId?: string | number;
  image: string | null;
};

export default function MyPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const myUserId = getCurrentUserId();

        if (!myUserId) {
          router.replace("/auth/login");
          return;
        }

        const posts = await getUserPosts(myUserId);
        setPosts(posts as Post[]);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Da co loi xay ra";
        if (message.includes("401") || message.includes("Unauthorized")) {
          router.replace("/auth/login");
          return;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [router]);

  const handleDeletePost = async (postId: string | number) => {
    const normalizedPostId = String(postId);

    try {
      setError(null);
      await deletePostById(normalizedPostId);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => String(post.id) !== normalizedPostId),
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Da co loi xay ra";
      if (message.includes("401") || message.includes("Unauthorized")) {
        router.replace("/auth/login");
        return;
      }
      setError(message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Bài viết của tôi </h1>

      {loading && <p>Đang tải...</p>}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-slate-600">
          Bạn chưa có bài viết nào. Hãy tạo bài viết mới tại{" "}
          <Link href="/posts/new" className="text-blue-600 hover:underline">
            đây
          </Link>
        </div>
      )}

      <div className="mx-auto max-w-5xl p-6">
        <div className="space-y-5">
          {posts.map((p) => {
            return (
              <PostCard
                key={p.id}
                href={`/posts/${p.id}`}
                title={p.title}
                previewText={p.excerpt ?? ""}
                image={p.image}
                authorUsername={p.author?.username ?? "Bạn"}
                createdAt={p.createdAt}
                actions={
                  <button
                    type="button"
                    onClick={() => void handleDeletePost(p.id)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Xóa
                  </button>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
