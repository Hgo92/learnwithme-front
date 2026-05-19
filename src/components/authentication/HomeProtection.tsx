import { Navigate, Outlet } from "react-router";
import { authClient } from "../../lib/auth-client";

export function HomeProtection(): React.ReactElement {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <div>Chargement en cours</div>;
  if (session) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
