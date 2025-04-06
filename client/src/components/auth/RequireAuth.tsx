import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../../enums/userRole";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface RequireAuthProps {
  allowedRoles: UserRole[];
}
export const RequireAuth = ({
  allowedRoles,
}: RequireAuthProps): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  return user?.roles.find((role) =>
    allowedRoles?.includes(role as UserRole)
  ) ? (
    <Outlet />
  ) : user?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
