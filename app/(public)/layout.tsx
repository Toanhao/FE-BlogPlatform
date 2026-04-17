
import "../globals.css";
import NavBar from "../components/nav-bar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

