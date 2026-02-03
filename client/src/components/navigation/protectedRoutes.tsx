import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const { data: _user, isError } = useCurrentUser();
  // no token -> redorect to login
  if (!token) return <Navigate to="/login" replace />;
  //there's an error wothe token
  if (isError) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  // all is well
  return <Outlet />;
}
