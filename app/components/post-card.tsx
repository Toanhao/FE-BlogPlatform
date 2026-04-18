import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type PostCardProps = {
  href: string;
  title: string;
  previewText: string;
  authorUsername: string;
  createdAt: string;
  image?: string | null;
  actions?: ReactNode;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("vi-VN");
}

const isImageLike = (src: string) =>
  /\.(png|jpe?g|webp|gif|avif|svg)(\?.*)?$/i.test(src);

const getSafeSrc = (src?: string) => {
  if (!src) return "/default-image.jpg";

  if (src.startsWith("http") && isImageLike(src)) {
    return src;
  }

  if (src.startsWith("/") && isImageLike(src)) {
    return src;
  }

  return "/blog-default.png";
};

export default function PostCard({
  href,
  title,
  previewText,
  authorUsername,
  createdAt,
  image,
  actions,
}: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Link
        href={href}
        className="flex flex-col transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row"
      >
        {image && (
          <div className="h-40 w-full overflow-hidden sm:h-44 sm:w-56 sm:flex-shrink-0">
            <Image
              src={getSafeSrc(image)}
              alt={title}
              width={240}
              height={176}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition hover:text-blue-600 sm:text-xl">
              {title}
            </h2>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
              {previewText}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 sm:text-sm">
            <span className="font-medium text-slate-600">
              Tác giả : {authorUsername}
            </span>
            <span>Ngày đăng : {formatDate(createdAt)}</span>
          </div>
        </div>
      </Link>
      {actions && (
        <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50 px-4 py-3">
          {actions}
        </div>
      )}
    </article>
  );
}
