import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ requiredRoles = [] }) => {
    const { isAuth, loading, roles } = useAuth();
    let navigate = useNavigate();

    if (!loading) {
        if (isAuth) {
            if (requiredRoles.length > 0) {
                const hasRequiredRole = requiredRoles.some(role => roles.includes(role));

                if (hasRequiredRole) {
                    return <Outlet />;
                }

                navigate("/forbidden");
                return null;
            }
        } else {
            navigate("/unauthorized");
            return null;
        }
    }

    return <Outlet />;
}