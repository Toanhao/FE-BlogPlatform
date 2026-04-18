"use client";

import React, { useState, useEffect } from "react";
import PostCard from "../../components/post-card";
import { serverApiFetch } from "@/app/lib/api/server-api-client";

type TabType = "today" | "week" | "all";

const TABS: { label: string; value: TabType }[] = [
  { label: "Hôm nay", value: "today" },
  { label: "Tuần qua", value: "week" },
  { label: "Tất cả", value: "all" },
];

type Post = {
  id: string;
  name: string;
  title: string;
  excerpt: string;
  createdAt: string;
  image?: string | null;
  authorId: string;
};

const TopPostsTabsSection = () => {
  const [tab, setTab] = useState<TabType>("today");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const data = await serverApiFetch<any[]>("/admin/statistics/top-posts");
        // Map lại để có name lấy từ author.username
        const mapped: Post[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          createdAt: item.createdAt,
          image: item.image,
          authorId: item.authorId,
          name: item.author?.username || ""
        }));
        if (!ignore) setPosts(mapped);
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Lỗi tải dữ liệu");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, [tab]);

  return (
    <section className="bg-white rounded-xl shadow p-6 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">Top Bài Viết</div>
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                tab === t.value
                  ? "bg-[#49a4f0] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {loading && <div>Đang tải...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && posts.length === 0 && <div>Không có bài viết nào.</div>}
        {!loading && !error && posts.map((post) => (
          <div key={post.id} className="relative">
            <PostCard
              href={`/posts/${post.id}`}
              title={post.title}
              previewText={post.excerpt}
              authorUsername={post.name}
              createdAt={post.createdAt}
              image={post.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPostsTabsSection;
