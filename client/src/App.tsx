import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./components/layout";
import HomePage from "./pages/HomePage";
import Test from "./pages/Test";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthLayout } from "./components/layout/AuthLayout";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
