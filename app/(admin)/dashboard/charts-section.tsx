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
import {useEffect, useState} from "react";

import {apiClient} from "@/app/lib/api/axios-instance";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}


export default function ChartsSection() {
  const [userData, setUserData] = useState<{date: string; users: number}[]>([]);
  const [postData, setPostData] = useState<{date: string; posts: number}[]>([]);


  useEffect(() => {
    apiClient
      .get<{date: string; userCount: number}[]>("/admin/statistics/user-daily")
      .then(res => {
        const data = res.data;
        setUserData(
          data.map(item => ({
            date: formatDate(item.date),
            users: item.userCount,
          }))
        );
      })
      .catch(err => {
        console.error("[UserDaily API] error:", err);
      });

    apiClient
      .get<{date: string; postCount: number}[]>("/admin/statistics/post-daily")
      .then(res => {
        const data = res.data;
        setPostData(
          data.map(item => ({
            date: formatDate(item.date),
            posts: item.postCount,
          }))
        );
      })
      .catch(err => {
        console.error("[PostDaily API] error:", err);
      });
  }, []);

  // ...existing code for postData and Post Creation Trend...
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
      {/* ...existing code for Post Creation Trend... */}
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
