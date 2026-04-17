
import "../globals.css";
import NavBar from "../components/nav-bar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
