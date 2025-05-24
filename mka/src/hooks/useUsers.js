import { useState, useEffect } from 'react';

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
      const res = await fetch('https://localhost:8400/api/v1/User/all', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Error al obtener usuarios');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err.message);
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
      const res = await fetch('https://localhost:8400/api/v1/User', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error('Error creating user');
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Editar usuario
  const editUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://localhost:8400/api/v1/User/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error('Error updating user');
      await fetchUsers(); // Refresca la lista tras editar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://localhost:8400/api/v1/User/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${token}`,
        },
      });
      if (!res.ok) throw new Error('Error deleting user');
      await fetchUsers(); // Refresca la lista tras eliminar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, fetchUsers, createUser, editUser, deleteUser };
}