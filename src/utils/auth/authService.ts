import { RateLimiter } from './RateLimiter';
import { AuthResult } from './types';
import { VALID_CREDENTIALS } from './constants';

// Create a singleton instance of RateLimiter
const rateLimiter = new RateLimiter();

export const validateCredentials = (username: string, password: string): AuthResult => {
  // Check if the user is blocked
  if (rateLimiter.isBlocked(username)) {
    const blockedFor = rateLimiter.getBlockedTime(username);
    const minutes = Math.ceil(blockedFor! / (60 * 1000));
    return {
      success: false,
      blockedFor: blockedFor!,
      message: `Too many failed attempts. Please try again in ${minutes} minutes.`
    };
  }

  // Validate credentials
  const isValid = VALID_CREDENTIALS.some(
    cred => cred.username === username && cred.password === password
  );

  if (isValid) {
    rateLimiter.reset(username);
    return { success: true };
  }

  // Record failed attempt and get remaining attempts
  rateLimiter.recordAttempt(username);
  const remaining = rateLimiter.getRemainingAttempts(username);

  return {
    success: false,
    remainingAttempts: remaining,
    message: remaining > 0 
      ? `Invalid credentials. ${remaining} attempts remaining.`
      : 'Too many failed attempts. Please try again later.'
  };
};