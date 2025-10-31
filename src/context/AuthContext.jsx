import { createContext, useContext, useState, useEffect } from "react";
import {
  loginRequest,
  registerRequest,
  verifyToken,
} from "../api/requests/users.request";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Clear Errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Register
  const signUp = async (userData) => {
    try {
      const res = await registerRequest(userData);
      if (res.status === 201) {
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      return false;
    }
  };

  const signIn = async (loginData) => {
    try {
      const res = await loginRequest(loginData);
      if (res.status === 200 && res.data) {
        localStorage.setItem("token", res.data);
        setIsAuth(true);
        return true;
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrors([error.response.data.message]);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  };

  // Verify Token at App Start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyToken();
        setUser(res.data);
        setRoles(res.data.roles.map(role => {
          return role.name;
        }));
        setIsAuth(true);
        setLoading(false);
      } catch (error) {
        console.log("Invalid or Expired Token: ", error);
        localStorage.removeItem("token");
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        roles,
        loading,
        errors,
        setErrors,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
