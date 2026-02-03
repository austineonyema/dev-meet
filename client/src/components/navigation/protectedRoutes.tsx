import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export function ProtectedRoute() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Checking session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
