import { Navigate } from "react-router-dom";
import Loading from "./Loading"; // أو أي مكون تحميل

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return <Loading>جاري التحقق من المستخدم...</Loading>;
  }

  if (!user) {
    return <Navigate to="/LogInPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
