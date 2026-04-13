import PostComments from "@/app/components/post-comments";

type PostComment = {
  id?: string;
  content: string;
  author?: {
    username?: string;
  };
};

type PostDetailData = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
  author: {
    username: string;
  };
  comments?: PostComment[];
};

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    cache: "no-store",
  });

  const post: PostDetailData = await res.json();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="h-64 w-full object-cover"
          />
        )}

        <div className="p-5 sm:p-6">
          <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {post.title}
          </h1>

          <div className="mt-3 border-b border-slate-100 pb-4 text-sm text-slate-500">
            <span className="font-medium text-slate-700">
              {post.author?.username ?? "Người dùng"}
            </span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
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