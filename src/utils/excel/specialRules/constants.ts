/**
 * Constants for special value calculations
 */
import {
  EIGHT_MULTIPLIER_PATTERNS,
  FIVE_MULTIPLIER_PATTERNS,
  ONE_MULTIPLIER_PATTERNS
} from './patterns/multiplierPatterns';

export const MULTIPLIER_VALUES = {
  DEFAULT: 10,
  EIGHT: 8,
  FIVE: 5,
  ONE: 1
} as const;

export const SPECIAL_VALUES = {
  EIGHT_MULTIPLIER: EIGHT_MULTIPLIER_PATTERNS,
  FIVE_MULTIPLIER: FIVE_MULTIPLIER_PATTERNS,
  ONE_MULTIPLIER: ONE_MULTIPLIER_PATTERNS
} as const;

export const CHECK1_MULTIPLIER = 1.005;