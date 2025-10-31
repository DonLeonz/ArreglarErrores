import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = (requiredRoles) => {
    const { isAuth, loading, roles } = useAuth();
    let navigate = useNavigate();

    if (!loading) {
        if (!isAuth) {
            navigate("/");
        }
    }
    return <Outlet />;
}