import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../enums/userRole";

interface RequireAuthProps {
  allowedRoles: UserRole[];
}
export const RequireAuth = ({
  allowedRoles,
}: RequireAuthProps): JSX.Element => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) =>
    allowedRoles?.includes(role as UserRole)
  ) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
