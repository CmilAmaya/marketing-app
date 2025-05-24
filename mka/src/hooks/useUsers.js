import { useState, useEffect } from 'react';
import {
  getUsersApi,
  createUserApi,
  editUserApi,
  deleteUserApi
} from '../api/api';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsersApi(token);
      if (data && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err.message || 'Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [token]);

  // Crear usuario
  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await createUserApi(userData, token);
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'Error creating user');
    } finally {
      setLoading(false);
    }
  };

  // Editar usuario
  const editUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      await editUserApi(id, userData, token);
      await fetchUsers(); // Refresca la lista tras editar
    } catch (err) {
      setError(err.message || 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserApi(id, token);
      await fetchUsers(); // Refresca la lista tras eliminar
    } catch (err) {
      setError(err.message || 'Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, fetchUsers, createUser, editUser, deleteUser };
}