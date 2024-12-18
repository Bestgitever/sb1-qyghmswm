import { useState, useCallback } from 'react';
import { AuthState } from '../utils/auth/types';
import { validateCredentials } from '../utils/auth/authService';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null
  });
  const [error, setError] = useState<string>('');

  const login = useCallback((username: string, password: string) => {
    const result = validateCredentials(username, password);

    if (result.success) {
      setAuthState({
        isAuthenticated: true,
        username
      });
      setError('');
    } else {
      setError(result.message || 'Invalid username or password');
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      username: null
    });
    setError('');
  }, []);

  return {
    authState,
    error,
    login,
    logout
  };
}