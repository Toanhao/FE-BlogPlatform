"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userData = [
  { date: "12/4", users: 2 },
  { date: "13/4", users: 4 },
  { date: "14/4", users: 1 },
  { date: "15/4", users: 5 },
  { date: "16/4", users: 3 },
  { date: "17/4", users: 6 },
  { date: "18/4", users: 2 },
];

const postData = [
  { date: "12/4", posts: 10 },
  { date: "13/4", posts: 8 },
  { date: "14/4", posts: 12 },
  { date: "15/4", posts: 7 },
  { date: "16/4", posts: 15 },
  { date: "17/4", posts: 9 },
  { date: "18/4", posts: 11 },
];

export default function ChartsSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow p-6 min-h-[260px] flex flex-col">
        <div className="text-lg font-semibold mb-2">
          User Registration Trend
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={userData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#49a4f0"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 min-h-[260px] flex flex-col">
        <div className="text-lg font-semibold mb-2">Post Creation Trend</div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={postData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="posts"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
