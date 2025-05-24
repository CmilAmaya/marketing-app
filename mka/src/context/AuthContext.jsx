import { createContext, useContext } from 'react';
import { useAuthProvider } from '../hooks/useAuth';
import React from 'react'; // Asegura que React esté importado para JSX

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
