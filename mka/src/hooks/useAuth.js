import { useState } from 'react';
import { loginApi, logoutApi } from '../api/api';

export function useAuthProvider() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi({ email, password });
      if (data && data.data) {
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('token', data.data.token);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Wrong credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    try {
      await logoutApi(token);
    } catch {
      // Ignorar error de logout
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, login, logout, loading, error };
}
