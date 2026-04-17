import Link from "next/link";
import PostCard from "../../components/post-card";
import { PostListItem } from "../../lib/api/blog-api";
import { serverApiFetch } from "../../lib/api/server-api-client";

type Post = PostListItem;

const PAGE_SIZE = 4;
const POSTS_REVALIDATE_SECONDS = 60;
const POSTS_LIST_TAG = "posts:list";

function parsePageParam(rawPage?: string): number {
  if (!rawPage || !/^\d+$/.test(rawPage)) {
    return 1;
  }

  const parsed = Number(rawPage);

  if (!Number.isFinite(parsed) || !Number.isSafeInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

async function getPosts(
  page: number,
  keyword: string,
): Promise<{
  items: Post[];
  total: number;
}> {
  const skip = (page - 1) * PAGE_SIZE;
  return serverApiFetch<{ items: Post[]; total: number }>("/posts/paginated", {
    params: {
      skip: String(skip),
      limit: String(PAGE_SIZE),
      order: "createdAt DESC",
      ...(keyword ? { q: keyword } : {}),
    },
    next: {
      revalidate: POSTS_REVALIDATE_SECONDS,
      tags: [POSTS_LIST_TAG],
    },
  });
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page, q } = await searchParams;
  const keyword = q?.trim() ?? "";

  const requestedPage = parsePageParam(page);

  let { items: posts, total } = await getPosts(requestedPage, keyword);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const currentPage = Math.min(requestedPage, totalPages);

  if (currentPage !== requestedPage) {
    const recalculated = await getPosts(currentPage, keyword);
    posts = recalculated.items;
    total = recalculated.total;
  }

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams({ page: String(nextPage) });

    if (keyword) {
      params.set("q", keyword);
    }

    return `/posts?${params.toString()}`;
  };

  const prevHref = buildPageHref(currentPage - 1);
  const nextHref = buildPageHref(currentPage + 1);
  const clearHref = "/posts";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {keyword ? `Kết quả cho “${keyword}”` : "Tất cả bài viết"}
          </h1>
        </div>

        <form
          action="/posts"
          method="get"
          className="flex w-full gap-2 sm:max-w-md"
        >
          <input
            type="text"
            name="q"
            defaultValue={keyword}
            placeholder="Tìm theo title..."
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-slate-500"
          />
          <input type="hidden" name="page" value="1" />
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Tìm
          </button>
          {keyword ? (
            <Link
              href={clearHref}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Xóa
            </Link>
          ) : null}
        </form>
      </div>

      {/* List */}
      <div className="space-y-5">
        {posts.length > 0 ? (
          posts.map((p) => (
            <PostCard
              key={p.id}
              href={`/posts/${p.id}`}
              title={p.title}
              previewText={p.excerpt ?? ""}
              image={p.image}
              authorUsername={p.author.username}
              createdAt={p.createdAt}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Không tìm thấy bài viết nào phù hợp.
          </div>
        )}
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
