import { Navigate, Outlet } from "react-router";
import { authClient } from "../../lib/auth-client";

export function RouteProtection(): React.ReactElement {
  const { data: session, isPending } = authClient.useSession();

  if (!session && !isPending) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
