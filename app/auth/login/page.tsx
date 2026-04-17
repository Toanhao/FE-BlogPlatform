"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginPayload } from "@/app/lib/api/blog-api";
import { saveAuthSession } from "@/app/lib/auth-storage";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Vui lòng nhập email và password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await login(form);
      saveAuthSession(data.user);

      router.replace("/posts/my-posts");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Dang nhap that bai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? "Đang đăng nhập..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <p className="text-sm text-center mt-4">
          Chưa có tài khoản?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
