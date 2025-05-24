import { useState, useEffect } from 'react';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:8400/api/v1/User/all', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        if (!res.ok) throw new Error('Error al obtener usuarios');
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}