import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-slate-50 text-slate-900">{children}</main>;
}
