
import { redirect } from "next/navigation";
import { getCurrentUser } from "./_auth";
import Sidebar from "./sidebar";
import DashboardCards from "./dashboard-cards";
import ChartsSection from "./charts-section";
import TopPostsTabsSection from "./top-posts-tabs-section";
import TopUsersSection from "./top-users-section";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    redirect("/posts");
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 lg:p-12" >
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        {/* KPI Cards */}
        <section className="mb-6">
          <DashboardCards />
        </section>
        {/* Charts */}
        <ChartsSection />
        {/* Top Posts */}
        <section className="mb-6">
          <TopPostsTabsSection />
        </section>
        {/* Top Users */}
        <section className="mb-6">
          <TopUsersSection />
        </section>
      </main>
    </div>
  );
}
