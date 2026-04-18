import Image from "next/image";
const mockUsers = [
  { name: 'User A', postCount: 20, avatar: '/avatar1.png' },
  { name: 'User B', postCount: 18, avatar: '/avatar2.png' },
  { name: 'User C', postCount: 15, avatar: '/avatar3.png' },
  { name: 'User D', postCount: 12, avatar: '/avatar4.png' },
  { name: 'User E', postCount: 10, avatar: '/avatar5.png' },
];

export default function TopUsersSection() {
  return (
    <section className="bg-white rounded-xl shadow p-6 flex-1 min-w-0">
      <div className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="inline-block text-2xl">🏆</span>
        Bảng xếp hạng tác giả
      </div>
      <ol className="space-y-3">
        {mockUsers.map((user, idx) => (
          <li
            key={user.name}
            className="flex items-center gap-10 p-3 rounded-xl transition hover:bg-slate-50 shadow-sm"
          >
            <span className="text-xl font-bold text-[#49a4f0] w-7 text-right">{idx + 1}</span>
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
            />
            <div className="flex items-center gap-8 flex-1">
              <span className="font-semibold text-slate-800">{user.name}</span>
              <span className="text-gray-500 text-sm font-medium">{user.postCount} bài viết</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
