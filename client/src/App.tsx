import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import PostsPage from "./features/posts/pages/PostsPage";
import PostEditor from "./features/posts/components/PostEditor";
import PostDetailPage from "./features/posts/pages/PostDetailPage";
import { AuthLayout, Layout, DashboardLayout } from "./components/layout";
import HomePage from "./pages/HomePage";
import Test from "./pages/Test";
import { usePageTitle } from "./hooks/usePageTitle";
import SettingsPage from "./features/settings/pages/SettingsPage";
import { ProtectedRoute } from "./components/navigation/protectedRoutes";

function App() {
  usePageTitle();
  return (
    <Routes>
      {/* Public Main Routes */}
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<Test />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/posts">
            <Route index element={<PostsPage />} />
            <Route path="new" element={<PostEditor />} />
            <Route path=":id" element={<PostDetailPage />} />
          </Route>
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
