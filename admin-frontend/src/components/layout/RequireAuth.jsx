import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireAuth({ children }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-state">Loading…</div>;
  }

  if (!admin) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
