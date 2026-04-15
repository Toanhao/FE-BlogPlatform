"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPost, CreatePostPayload } from "@/lib/api/blog-api";

export default function NewPostForm() {
  const router = useRouter();
  const [form, setForm] = useState<CreatePostPayload>({
    title: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      setError("Vui lòng điền đầy đủ tiêu đề và nội dung");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await createPost(form);
      router.push(`/posts/${data.id}`);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-5 shadow-sm"
    >
      <input
        name="title"
        placeholder="Tiêu đề"
        value={form.title}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="image"
        placeholder="URL ảnh (không bắt buộc)"
        value={form.image}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="content"
        placeholder="Nội dung"
        value={form.content}
        onChange={handleChange}
        rows={8}
        className="w-full rounded-lg border p-3"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:bg-slate-400"
      >
        {loading ? "Đang tạo..." : "Đăng bài"}
      </button>
    </form>
  );
}