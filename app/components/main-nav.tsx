"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthSession, getAuthSnapshot } from "@/lib/auth-storage";

const linkBase =
  "rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400";

const navItems = [
  { href: "/posts", label: "Trang chủ" },
  { href: "/my-posts", label: "Bài viết của tôi" },
  { href: "/posts/new", label: "Tạo bài viết mới" },
];

export default function MainNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const syncAuth = () => {
      const state = getAuthSnapshot();
      setIsAuth(state.isAuth);
      setUsername(state.username);
    };

    syncAuth();

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-changed", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const logout = () => {
    clearAuthSession();

    router.push("/auth/login");
  };

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        {/* LOGO */}
        <Link href="/posts" className="text-lg font-bold">
          Blog Platform
        </Link>

        {/* NAV ITEMS */}
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${linkBase} ${
                isActive(item.href)
                  ? "bg-slate-200 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* AUTH SECTION */}
        <div className="ml-auto">
          {isAuth ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-700">
                Xin chào{username ? `, ${username}` : ""}
              </span>

              <button
                onClick={logout}
                className={`${linkBase} border text-slate-700 hover:bg-slate-100`}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className={`${linkBase} border text-slate-600 hover:bg-slate-100`}
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
