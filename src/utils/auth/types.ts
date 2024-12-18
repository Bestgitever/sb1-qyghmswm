export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

export interface AuthResult {
  success: boolean;
  remainingAttempts?: number;
  blockedFor?: number;
  message?: string;
}

export interface Credentials {
  username: string;
  password: string;
}