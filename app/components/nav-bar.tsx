
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserInfoClient from "./user-info-client";

const linkBase =
  "rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400";

const navItems = [
  { href: "/posts", label: "Trang chủ" },
  { href: "/posts/my-posts", label: "Bài viết của tôi" },
  { href: "/posts/new", label: "Tạo bài viết mới" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        {/* LOGO */}
        <Link href="/posts" className="text-lg font-bold">
          Blog Platform
        </Link>
        {/* NAV ITEMS */}
        <div className="flex gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/posts" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  linkBase + (isActive ? " bg-blue-100 text-black-700 font-semibold" : " text-slate-700 hover:bg-slate-100")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        {/* AUTH SECTION */}
        <div className="ml-auto flex items-center gap-3">
          <UserInfoClient />
        </div>
      </nav>
    </header>
  );
}
