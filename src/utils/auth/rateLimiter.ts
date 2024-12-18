interface RateLimitEntry {
  attempts: number;
  blockedUntil: number | null;
  firstAttempt: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();
  private readonly MAX_ATTEMPTS = 3;
  private readonly BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private readonly RESET_AFTER = 30 * 60 * 1000; // 30 minutes in milliseconds

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

    // Reset if the reset period has passed since first attempt
    if (now - entry.firstAttempt > this.RESET_AFTER) {
      entry.attempts = 1;
      entry.firstAttempt = now;
      entry.blockedUntil = null;
    } else {
      entry.attempts++;
      if (entry.attempts >= this.MAX_ATTEMPTS) {
        entry.blockedUntil = now + this.BLOCK_DURATION;
      }
    }

    this.attempts.set(key, entry);
  }

  isBlocked(key: string): boolean {
    const entry = this.getEntry(key);
    const now = Date.now();

    // Reset if block duration has passed
    if (entry.blockedUntil && now > entry.blockedUntil) {
      this.attempts.delete(key);
      return false;
    }

    return !!entry.blockedUntil;
  }

  getRemainingAttempts(key: string): number {
    const entry = this.getEntry(key);
    return Math.max(0, this.MAX_ATTEMPTS - entry.attempts);
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