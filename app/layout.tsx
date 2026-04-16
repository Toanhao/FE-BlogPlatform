import "./globals.css";
import MainNavWrapper from "./components/main-nav-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <MainNavWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
