import { cookies } from "next/headers";
import MainNav from "@/app/components/main-nav";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

async function getCurrentUser(token: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const profile = (await response.json()) as UserProfile;
    return profile;
  } catch {
    return null;
  }
}

export default async function MainNavWrapper() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  let user: UserProfile | null = null;
  if (token) {
    user = await getCurrentUser(token);
  }

  return (
    <MainNav
      isAuth={!!user}
      username={user?.name ?? null}
    />
  );
}
