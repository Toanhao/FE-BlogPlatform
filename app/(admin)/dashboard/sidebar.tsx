import React from 'react';

const navItems = [
  { label: 'Thống kê', icon: '📊', active: true },
  { label: 'Quản lý người dùng', icon: '👤' },
  { label: 'Quản lý bài viết', icon: '📝' },
  { label: 'Đăng xuất', icon: '🚪' },
];


export default function AdminSidebar() {
  return (
    <aside
      className="hidden md:flex flex-col min-w-[220px] max-w-[240px] h-screen sticky top-0 left-0 py-8 px-4 shadow-lg z-30"
      style={{ background: '#253544' }}
    >
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-[#49a4f0] rounded-lg w-10 h-10 flex items-center justify-center text-xl font-bold text-white">A</div>
        <span className="text-xl font-bold tracking-wide text-white">Admin</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-base font-medium ${
              item.active
                ? 'bg-[#223040] text-[#49a4f0] font-semibold shadow'
                : 'hover:bg-[#223040] hover:text-[#49a4f0] text-[#b6c0ce]'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="text-xs text-[#b6c0ce] px-2 mt-8">© 2026 Blog Platform</div>
    </aside>
  );
}
