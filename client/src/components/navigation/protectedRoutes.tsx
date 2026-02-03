import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../../../../shared/types/user";

export function ProtectedRoute({ user }: { user: User }) {
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
