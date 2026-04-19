import Image from "next/image";
import { serverApiFetch } from "@/app/lib/api/server-api-client";

type User = {
  id: string;
  username: string;
  avatar?: string;
  postCount: number;
};

export default async function TopUsersSection() {
  let users: User[] = [];
  let error: string | null = null;
  try {
    users = await serverApiFetch<User[]>("/admin/statistics/top-users");
  } catch (e: unknown) {
    error = (e as { message?: string })?.message || "Lỗi tải dữ liệu";
  }

  return (
    <section className="bg-white rounded-xl shadow p-6 flex-1 min-w-0">
      <div className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="inline-block text-2xl">🏆</span>
        Bảng xếp hạng tác giả
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {!error && (
        <ol className="space-y-3">
          {users.length === 0 && <div>Không có dữ liệu.</div>}
          {users.map((user, idx) => (
            <li
              key={user.id}
              className="flex items-center gap-10 p-3 rounded-xl transition hover:bg-slate-50 shadow-sm"
            >
              <span className="text-xl font-bold text-[#49a4f0] w-7 text-right">
                {idx + 1}
              </span>
              <Image
                src={
                  user.avatar || "/avatar-default-svgrepo-com.svg"
                }
                alt={user.username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
              />
              <div className="flex items-center gap-8 flex-1">
                <span className="font-semibold text-slate-800">
                  {user.username}
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  {user.postCount} bài viết
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
