import { PostComment } from "@/app/lib/api/blog-api";
import Image from "next/image";

type CommentItemProps = {
  comment: PostComment;
};

export function CommentItem({ comment }: CommentItemProps) {
  const displayName = comment.author?.username ?? "Người dùng";

  return (
    <div className="flex items-start gap-2.5">
      <Image
        src="/avatar-default-svgrepo-com.svg"
        alt="Avatar default"
        width={36}
        height={36}
        className="h-9 w-9 flex-shrink-0 rounded-full"
      />

      <div className="max-w-[85%] rounded-2xl bg-slate-200 px-3 py-2">
        <p className="text-sm font-semibold leading-5 text-slate-800">
          {displayName}
        </p>
        <p className="mt-0.5 text-sm leading-6 text-slate-700">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
