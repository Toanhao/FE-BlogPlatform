
import Icon from '@/app/components/shared/Icon';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  usersToday: number;
  postsToday: number;
}

const mockStats: DashboardStats = {
  totalUsers: 1234,
  totalPosts: 5678,
  usersToday: 12,
  postsToday: 34,
};

const cardList = [
  {
    label: 'Total Users',
    value: mockStats.totalUsers,
    icon: 'FaUser',
    bg: 'bg-blue-100',
    color: '#2563eb',
  },
  {
    label: 'Total Posts',
    value: mockStats.totalPosts,
    icon: 'FaFileAlt',
    bg: 'bg-green-100',
    color: '#22c55e',
  },
  {
    label: 'Users Today',
    value: mockStats.usersToday,
    icon: 'FaUserPlus',
    bg: 'bg-yellow-100',
    color: '#eab308',
  },
  {
    label: 'Posts Today',
    value: mockStats.postsToday,
    icon: 'FaRegCalendarPlus',
    bg: 'bg-pink-100',
    color: '#ec4899',
  },
];

export default function DashboardCards() {
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
