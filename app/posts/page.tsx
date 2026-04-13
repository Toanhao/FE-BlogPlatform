import Link from "next/link";
import PostCard from "@/app/components/post-card";

type Post = {
  id: string;
  title: string;
  excerpt?: string;
  image?: string;
  createdAt: string;
  author: { username: string };
};

const PAGE_SIZE = 4;

async function getPosts(page: number): Promise<{
  items: Post[];
  total: number;
}> {
  const skip = (page - 1) * PAGE_SIZE;

  const res = await fetch(
    `http://localhost:3001/posts/paginated?skip=${skip}&limit=${PAGE_SIZE}&order=createdAt%20DESC`,
    { next: { revalidate: 10 } },
  );

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const requestedPage = Math.max(1, Number(page) || 1);

  const { items: posts, total } = await getPosts(requestedPage);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const currentPage = Math.min(requestedPage, totalPages);

  const prevHref = `/posts?page=${currentPage - 1}`;
  const nextHref = `/posts?page=${currentPage + 1}`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tất cả bài viết</h1>

      {/* List */}
      <div className="space-y-5">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            href={`/posts/${p.id}`}
            title={p.title}
            previewText={p.excerpt ?? ""}
            image={p.image}
            authorUsername={p.author.username}
            createdAt={p.createdAt}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
        {/* Prev */}
        {currentPage > 1 ? (
          <Link
            href={prevHref}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Trang trước
          </Link>
        ) : (
          <span className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
            Trang trước
          </span>
        )}

        {/* Info */}
        <span className="text-sm text-slate-600">
          Trang {currentPage}/{totalPages} ({total} bài viết)
        </span>

        {/* Next */}
        {currentPage < totalPages ? (
          <Link
            href={nextHref}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Trang sau
          </Link>
        ) : (
          <span className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
            Trang sau
          </span>
        )}
      </div>
    </div>
  );
}
