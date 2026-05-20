import { Navigate, Outlet } from "react-router";
import { authClient } from "../../lib/auth-client";

export function HomeProtection(): React.ReactElement {
  const { data: session, isPending } = authClient.useSession();

  if (!isPending && session) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
