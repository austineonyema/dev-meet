import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import HomePage from "./pages/HomePage";
import Test from "./pages/Test";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<HomePage />} />
          {/* Auth routes will be added in Phase 2 */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
