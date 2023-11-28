import { Outlet, useLocation, Navigate } from "react-router-dom";
import { projectAuth } from "../firebase/config";

function PrivateRouteLayout() {
  const location = useLocation();
  return projectAuth.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

export default PrivateRouteLayout;
