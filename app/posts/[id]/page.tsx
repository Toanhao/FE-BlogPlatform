import Image from "next/image";
import PostComments from "@/app/components/post-comments";
import { getPostById, PostDetailData } from "@/lib/api/blog-api";

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
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const post: PostDetailData = await getPostById(id);

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
            <span>Ngày đăng : {new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
          </div>

          <div className="prose prose-slate mt-5 max-w-none whitespace-pre-line text-slate-700">
            {post.content}
          </div>
        </div>
      </article>

      <PostComments postId={id} comments={post.comments ?? []} />
    </div>
  );
}