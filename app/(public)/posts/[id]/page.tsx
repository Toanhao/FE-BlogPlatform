import Image from "next/image";
import PostComments from "./components/post-comments";
import {
  PaginatedCommentsData,
  PostDetailData,
} from "../../../lib/api/blog-api";
import { serverApiFetch } from "../../../lib/api/server-api-client";

const COMMENT_BATCH_SIZE = 5;

const isImageLike = (src: string) =>
  /\.(png|jpe?g|webp|gif|avif|svg)(\?.*)?$/i.test(src);

const getSafeSrc = (src?: string) => {
  if (!src) return "/default-image.jpg";

  if ((src.startsWith("http") || src.startsWith("/")) && isImageLike(src)) {
    return src;
  }

  return "/blog-default.png";
};

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const [post, commentsPage]: [PostDetailData, PaginatedCommentsData] =
  //   await Promise.all([
  //     getPostById(id),
  //     getPostComments(id, 0, COMMENT_BATCH_SIZE),
  //   ]);
  const post: PostDetailData = await serverApiFetch<PostDetailData>(
    `/posts/${id}`,
    {
      next: {
        revalidate: 60,
        tags: ["post:detail", `post:${id}`],
      },
    },
  );
  const commentsPage: PaginatedCommentsData =
    await serverApiFetch<PaginatedCommentsData>(`/posts/${id}/comments`, {
      params: {
        skip: 0,
        limit: COMMENT_BATCH_SIZE,
        order: "createdAt DESC",
      },
      next: {
        revalidate: 60,
        tags: [`post:${id}:comments`],
      },
    });
  return (
    <div className="mx-auto max-w-4xl p-6">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-130 w-full overflow-hidden bg-slate-100">
          <Image
            src={getSafeSrc(post.image)}
            alt={post.title}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        <div className="p-5 sm:p-6">
          <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {post.title}
          </h1>

          <div className="mt-3 border-b border-slate-100 pb-4 text-sm text-slate-500">
            <span className="font-medium text-slate-700">
              Tác giả : {post.author?.username ?? "Người dùng"}
            </span>
            <span className="mx-2">•</span>
            <span>
              Ngày đăng : {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="prose prose-slate mt-5 max-w-none whitespace-pre-line text-slate-700">
            {post.content}
          </div>
        </div>
      </article>

      <PostComments
        postId={id}
        comments={commentsPage.items}
        totalComments={commentsPage.total}
      />
    </div>
  );
}
