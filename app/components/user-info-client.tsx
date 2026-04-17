"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthSession, getStoredUser } from "@/app/lib/auth-storage";
import { logout as logoutApi } from "@/app/lib/api/blog-api";

export default function UserInfoClient() {
  const [user, setUser] = useState<{ id?: string | number; name?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handle = () => {
      const stored = getStoredUser();
      setUser(stored);
    };
    handle();
    window.addEventListener("auth-changed", handle);
    return () => window.removeEventListener("auth-changed", handle);
  }, []);

  const logout = async () => {
    try {
      await logoutApi();
    } catch {}
    clearAuthSession();
    router.refresh();
  };

  if (user && user.name) {
    return (
      <>
        <span className="text-sm text-slate-700">Xin chào, {user.name}</span>
        <button
          onClick={() => void logout()}
          className="rounded-md px-3 py-2 text-sm border text-slate-700 hover:bg-slate-100"
        >
          Đăng xuất
        </button>
      </>
    );
  }
  return (
    <>
      <a
        href="/auth/login"
        className="rounded-md px-3 py-2 text-sm border text-slate-600 hover:bg-slate-100"
      >
        Đăng nhập
      </a>
      <a
        href="/auth/register"
        className="rounded-md px-3 py-2 text-sm border text-slate-600 hover:bg-slate-100"
      >
        Đăng ký
      </a>
    </>
  );
}
