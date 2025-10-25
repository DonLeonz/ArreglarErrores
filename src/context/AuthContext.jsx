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
      console.log(userData);
      const res = await registerRequest(userData);
      if (res.status === 201) {
        console.log("Registered User: ", res.data);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response]);
      return false;
    }
  };

  const signIn = async (loginData) => {
    try {
      const res = await loginRequest(loginData);
      console.log(res.data);
      if (res.status === 200 && res.data) {
        localStorage.setItem("token", res.data);
        setIsAuth(true);
        return true;
      }
    } catch (error) {
      console.log(error.message);
      setErrors([error.message]);
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
        setLoading(false);
        return;
      }

      try {
        const res = await verifyToken();
        setUser(res.data);
        setIsAuth(true);
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
        loading,
        errors,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
