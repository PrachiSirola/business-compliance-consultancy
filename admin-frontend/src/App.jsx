import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/layout/RequireAuth";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Overview from "./pages/Overview";
import Enquiries from "./pages/Enquiries";
import Blogs from "./pages/Blogs";
import BlogEditor from "./pages/BlogEditor";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Overview />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/new" element={<BlogEditor />} />
            <Route path="blogs/:id/edit" element={<BlogEditor />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}