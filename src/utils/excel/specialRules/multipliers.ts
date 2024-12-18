/**
 * Multiplier calculation utilities
 */
import { MULTIPLIER_VALUES, SPECIAL_VALUES } from './constants';
import { isEmptyValue } from './validators';
import { hasPattern } from './utils/patternMatcher';

export const getSpecialValue = (columnValue: any): number => {
  if (isEmptyValue(columnValue)) {
    return 0;
  }
  
  const stringValue = String(columnValue).trim();

  // Check for EIGHT_MULTIPLIER patterns
  if (hasPattern(stringValue, SPECIAL_VALUES.EIGHT_MULTIPLIER)) {
    return MULTIPLIER_VALUES.EIGHT;
  }

  // Check for FIVE_MULTIPLIER patterns
  if (hasPattern(stringValue, SPECIAL_VALUES.FIVE_MULTIPLIER)) {
    return MULTIPLIER_VALUES.FIVE;
  }

  // Check for ONE_MULTIPLIER patterns
  if (hasPattern(stringValue, SPECIAL_VALUES.ONE_MULTIPLIER)) {
    return MULTIPLIER_VALUES.ONE;
  }

  return MULTIPLIER_VALUES.DEFAULT;
};