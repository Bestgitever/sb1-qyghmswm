import { AUTH_CONFIG } from './constants';

interface RateLimitEntry {
  attempts: number;
  blockedUntil: number | null;
  firstAttempt: number;
}

export class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();

  private getEntry(key: string): RateLimitEntry {
    return (
      this.attempts.get(key) || {
        attempts: 0,
        blockedUntil: null,
        firstAttempt: Date.now(),
      }
    );
  }

  recordAttempt(key: string): void {
    const entry = this.getEntry(key);
    const now = Date.now();

    if (now - entry.firstAttempt > AUTH_CONFIG.RESET_AFTER) {
      entry.attempts = 1;
      entry.firstAttempt = now;
      entry.blockedUntil = null;
    } else {
      entry.attempts++;
      if (entry.attempts >= AUTH_CONFIG.MAX_ATTEMPTS) {
        entry.blockedUntil = now + AUTH_CONFIG.BLOCK_DURATION;
      }
    }

    this.attempts.set(key, entry);
  }

  isBlocked(key: string): boolean {
    const entry = this.getEntry(key);
    const now = Date.now();

    if (entry.blockedUntil && now > entry.blockedUntil) {
      this.attempts.delete(key);
      return false;
    }

    return !!entry.blockedUntil;
  }

  getRemainingAttempts(key: string): number {
    const entry = this.getEntry(key);
    return Math.max(0, AUTH_CONFIG.MAX_ATTEMPTS - entry.attempts);
  }

  getBlockedTime(key: string): number | null {
    const entry = this.getEntry(key);
    if (!entry.blockedUntil) return null;
    
    const remaining = entry.blockedUntil - Date.now();
    return remaining > 0 ? remaining : null;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}