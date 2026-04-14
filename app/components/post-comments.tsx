"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { createComment, PostComment } from "@/lib/api/blog-api";
import { getStoredUser } from "@/lib/auth-storage";

type PostCommentsProps = {
  postId?: string;
  comments?: PostComment[];
  onCommentSubmit?: (commentContent: string) => void;
};

export default function PostComments({
  postId,
  comments = [],
  onCommentSubmit,
}: PostCommentsProps) {
  const [draftComment, setDraftComment] = useState("");
  const [localComments, setLocalComments] = useState<PostComment[]>(comments);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commentList = onCommentSubmit ? comments : localComments;

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = draftComment.trim();

    if (!trimmed) return;
    setError(null);

    if (onCommentSubmit) {
      onCommentSubmit(trimmed);
      setDraftComment("");
      return;
    }

    if (!postId) {
      setLocalComments((prev) => [
        ...prev,
        { content: trimmed, author: { username: "Bạn" } },
      ]);
      setDraftComment("");
      return;
    }

    setSubmitting(true);

    try {
      const data = await createComment({
        content: trimmed,
        postId,
      });

      const user = getStoredUser();

      setLocalComments((prev) => [
        ...prev,
        {
          id: data?.id,
          content: data?.content ?? trimmed,
          author: {
            username: user?.name || user?.username || "Ban",
          },
        },
      ]);
      setDraftComment("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";
      setError(
        message.includes("401") || message.includes("Unauthorized")
          ? "Vui lòng đăng nhập để bình luận"
          : message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Bình luận
        </h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {commentList.length}
        </span>
      </div>

      {commentList.length === 0 && (
        <p className="mb-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          Chưa có bình luận nào. Hãy là người mở đầu thảo luận.
        </p>
      )}

      {commentList.length > 0 && (
        <div className="mb-4 space-y-3">
          {commentList.map((comment, idx) => {
            const displayName = comment.author?.username ?? "Người dùng";

            return (
              <div
                key={comment.id ?? `${displayName}-${idx}`}
                className="flex items-start gap-2.5"
              >
                <Image
                  src="/avatar-default-svgrepo-com.svg"
                  alt="Avatar default"
                  width={36}
                  height={36}
                  className="h-9 w-9 flex-shrink-0 rounded-full"
                />

                <div className="max-w-[85%] rounded-2xl bg-slate-200 px-3 py-2">
                  <p className="text-sm font-semibold leading-5 text-slate-800">
                    {displayName}
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-slate-700">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <form onSubmit={handleSubmitComment} className="space-y-2.5">
        <label
          htmlFor="new-comment"
          className="text-sm font-medium text-slate-700"
        >
          Viết bình luận mới
        </label>

        <div className="flex items-start gap-2.5">
          <Image
            src="/avatar-default-svgrepo-com.svg"
            alt="Avatar default"
            width={36}
            height={36}
            className="h-9 w-9 flex-shrink-0 rounded-full"
          />

          <textarea
            id="new-comment"
            value={draftComment}
            onChange={(e) => setDraftComment(e.target.value)}
            rows={2}
            placeholder="Viết bình luận..."
            disabled={submitting}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {submitting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>
      </form>
    </section>
  );
}
