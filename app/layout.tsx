import "./globals.css"
import MainNav from "./components/main-nav"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <MainNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
