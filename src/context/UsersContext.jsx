import { createContext, useContext, useState } from "react";
import {
  searchUsersRequest,
  getUserRequest,
  updateUserRoleRequest,
  toggleUserStatusRequest,
  deleteUserRequest
} from "../api/requests/users.request";

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsers must be used within a UsersProvider");
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [modifiedUsers, setModifiedUsers] = useState(false);
  const [errors, setErrors] = useState([]);

  // Buscar todos los usuarios
  const searchUsers = async (params) => {
    try {
      const res = await searchUsersRequest(params);
      if (res.status === 200 && res.data) {
        setUsers(res.data);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al buscar usuarios"]);
      return false;
    }
  };

  // Obtener un usuario específico
  const getUser = async (userId) => {
    try {
      const res = await getUserRequest(userId);
      if (res.status === 200 && res.data) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al obtener usuario"]);
      return null;
    }
  };

  // Actualizar rol de usuario
  const updateUserRole = async (userId, newRole) => {
    try {
      const res = await updateUserRoleRequest(userId, { roleName: newRole });
      if (res.status === 200 || res.status === 204) {
        setModifiedUsers(true);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al actualizar rol"]);
      return false;
    }
  };

  // Suspender/activar usuario
  const toggleUserStatus = async (userId) => {
    try {
      const res = await toggleUserStatusRequest(userId);
      if (res.status === 200 || res.status === 204) {
        setModifiedUsers(true);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al cambiar estado"]);
      return false;
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId) => {
    try {
      const res = await deleteUserRequest(userId);
      if (res.status === 200 || res.status === 204) {
        setModifiedUsers(true);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al eliminar usuario"]);
      return false;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        errors,
        modifiedUsers,
        searchUsers,
        getUser,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
        setModifiedUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
