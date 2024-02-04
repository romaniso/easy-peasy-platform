import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {UserRole} from "../../enums/userRole";
import React from "react";

interface RequireAuthProps {
    allowedRoles: UserRole[];
}
const RequireAuth: React.FC<RequireAuthProps> = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find((role) => allowedRoles?.includes(role as UserRole))
            ? <Outlet/>
            : auth?.user
                ? <Navigate to='/unauthorized' state={{from: location}} replace />
                : <Navigate to='/auth' state={{from: location}} replace />
    )
}

export default RequireAuth;