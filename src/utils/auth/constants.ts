// Note: In a production environment, these would be stored securely on a server
export const VALID_CREDENTIALS = [
  { username: 'admin', password: 'columns2024!' },
  { username: 'user1', password: 'secure123' },
  { username: 'user2', password: 'access456' }
] as const;

export const AUTH_CONFIG = {
  MAX_ATTEMPTS: 3,
  BLOCK_DURATION: 15 * 60 * 1000, // 15 minutes
  RESET_AFTER: 30 * 60 * 1000, // 30 minutes
} as const;