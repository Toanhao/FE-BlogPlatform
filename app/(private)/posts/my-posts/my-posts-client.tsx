"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostCard from "../../../components/post-card";
import { PostListItem } from "../../../lib/api/blog-api";
import { deleteMyPostAction } from "./actions";

type Post = PostListItem & {
  authorId?: string | number;
  image: string | null;
};

type MyPostsClientProps = {
  initialPosts: Post[];
};

export default function MyPostsClient({ initialPosts }: MyPostsClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeletePost = async (postId: string | number) => {
    const normalizedPostId = String(postId);
    try {
      setError(null);
      const result = await deleteMyPostAction(normalizedPostId);
      if (!result.ok) {
        throw new Error(result.error ?? "Da co loi xay ra");
      }
      setPosts((prevPosts) =>
        prevPosts.filter((post) => String(post.id) !== normalizedPostId),
      );
      // Always refresh to sync with server state
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Da co loi xay ra";
      setError(message);
    }
  };

  return (
    <>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!error && posts.length === 0 && (
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
    </>
  );
}
