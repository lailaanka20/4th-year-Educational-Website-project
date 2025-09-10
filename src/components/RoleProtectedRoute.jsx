import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ userData, allowedRole, children }) => {
  if (!userData) return <Navigate to="/" replace />;
  if (userData.role !== allowedRole) return <Navigate to="/MainPage" replace />;
  return children;
};

export default RoleProtectedRoute;
