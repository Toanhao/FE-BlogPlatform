import Icon from "@/app/components/shared/Icon";
import { serverApiFetch } from "@/app/lib/api/server-api-client";
export interface DashboardStats {
  totalUser: number;
  totalPost: number;
  todayUser: number;
  todayPost: number;
}

export default async function DashboardCards() {
  let stats: DashboardStats | null = null;
  let error = "";
  try {
    const res = await serverApiFetch<DashboardStats>(
      "/admin/statistics/count",
      { cache: "no-store" },
    );
    if (res && typeof res === "object") {
      stats = res;
    }
  } catch (e: unknown) {
    error = "Không lấy được dữ liệu thống kê";
  }

  let cardList: Array<{
    label: string;
    value: number;
    icon: string;
    bg: string;
    color: string;
  }> = [];
  if (stats) {
    cardList = [
      {
        label: "Total Users",
        value: stats.totalUser,
        icon: "FaUser",
        bg: "bg-blue-100",
        color: "#2563eb",
      },
      {
        label: "Total Posts",
        value: stats.totalPost,
        icon: "FaFileAlt",
        bg: "bg-green-100",
        color: "#22c55e",
      },
      {
        label: "Users Today",
        value: stats.todayUser,
        icon: "FaUserPlus",
        bg: "bg-yellow-100",
        color: "#eab308",
      },
      {
        label: "Posts Today",
        value: stats.todayPost,
        icon: "FaRegCalendarPlus",
        bg: "bg-pink-100",
        color: "#ec4899",
      },
    ];
  }

  if (error) {
    return <div className="text-red-500 text-center my-4">{error}</div>;
  }
  if (!stats) {
    return (
      <div className="text-center my-4 text-gray-500">Đang tải dữ liệu...</div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cardList.map((card) => (
        <div
          key={card.label}
          className={`rounded-lg shadow p-6 flex flex-col items-center ${card.bg}`}
        >
          <div className="text-3xl mb-2">
            <Icon name={card.icon} size={36} color={card.color} />
          </div>
          <div className="text-2xl font-bold">{card.value}</div>
          <div className="text-gray-600 mt-1">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
