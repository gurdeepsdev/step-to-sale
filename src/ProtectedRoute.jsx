import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookies.get("token");  // Check authentication on every render

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
