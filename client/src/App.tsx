import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditor from "./components/features/PostEditor";
import PostDetailPage from "./pages/posts/PostDetailPage";
import { AuthLayout, Layout, DashboardLayout } from "./components/layout";
import HomePage from "./pages/HomePage";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
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
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<PostEditor />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
