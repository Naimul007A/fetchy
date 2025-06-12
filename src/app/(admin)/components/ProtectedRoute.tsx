import { cookies } from "next/headers";
import { LoginScreen } from "./LoginScreen";

const AUTH_COOKIE = "admin_auth";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE);
  if (authCookie) return <>{children}</>;
  return <LoginScreen>{children}</LoginScreen>;
}