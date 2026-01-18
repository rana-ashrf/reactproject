import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is logged in → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If logged out → show page
  return children;
};

export default PublicRoute;
