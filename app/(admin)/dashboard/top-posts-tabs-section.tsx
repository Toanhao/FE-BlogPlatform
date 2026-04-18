'use client'

import React, { useState } from 'react';
import PostCard from '../../components/post-card';

type TabType = 'today' | 'week' | 'all';

const TABS: { label: string; value: TabType }[] = [
  { label: 'Hôm nay', value: 'today' },
  { label: 'Tuần qua', value: 'week' },
  { label: 'Tất cả', value: 'all' },
];


type Post = {
  id: string;
  title: string;
  previewText: string;
  authorUsername: string;
  createdAt: string;
  image?: string | null;
  comments: number;
};

const mockPosts: Record<TabType, Post[]> = {
  today: [
    {
      id: '1',
      title: 'Post Today 1',
      previewText: 'Đây là tóm tắt ngắn cho bài viết hôm nay số 1.',
      authorUsername: 'User A',
      createdAt: '2026-04-18',
      image: '/sample1.jpg',
      comments: 5,
    },
    {
      id: '2',
      title: 'Post Today 2',
      previewText: 'Đây là tóm tắt ngắn cho bài viết hôm nay số 2.',
      authorUsername: 'User B',
      createdAt: '2026-04-18',
      image: '/sample2.jpg',
      comments: 3,
    },
  ],
  week: [
    {
      id: '3',
      title: 'Post Week 1',
      previewText: 'Tóm tắt bài viết nổi bật trong tuần qua.',
      authorUsername: 'User C',
      createdAt: '2026-04-15',
      image: '/sample3.jpg',
      comments: 12,
    },
    {
      id: '4',
      title: 'Post Week 2',
      previewText: 'Một bài viết khác trong tuần qua.',
      authorUsername: 'User D',
      createdAt: '2026-04-14',
      image: '/sample4.jpg',
      comments: 8,
    },
  ],
  all: [
    {
      id: '5',
      title: 'Post All 1',
      previewText: 'Bài viết có nhiều bình luận nhất mọi thời đại.',
      authorUsername: 'User E',
      createdAt: '2026-03-10',
      image: '/sample5.jpg',
      comments: 30,
    },
    {
      id: '6',
      title: 'Post All 2',
      previewText: 'Bài viết nổi bật khác.',
      authorUsername: 'User F',
      createdAt: '2026-02-20',
      image: '/sample6.jpg',
      comments: 25,
    },
  ],
};

export default function TopPostsTabsSection() {
  const [tab, setTab] = useState<TabType>('today');
  const posts = mockPosts[tab];

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
                  ? 'bg-[#49a4f0] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <PostCard
              href={`/posts/${post.id}`}
              title={post.title}
              previewText={post.previewText}
              authorUsername={post.authorUsername}
              createdAt={post.createdAt}
              image={post.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
