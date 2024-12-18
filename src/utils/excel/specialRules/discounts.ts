/**
 * Discount calculation utilities
 */
import { DISCOUNT_PATTERNS } from './constants';
import { hasPattern } from './validators';

export const hasDiscountText = (text: string): boolean => {
  return hasPattern(text, DISCOUNT_PATTERNS);
};

export const getDiscountValue = (columnSixValue: any, columnSevenValue: any): number => {
  if (!columnSixValue || !columnSevenValue) return 0;
  
  const textValue = String(columnSixValue);
  if (hasDiscountText(textValue)) {
    const numValue = parseFloat(columnSevenValue);
    return isNaN(numValue) ? 0 : Math.abs(numValue);
  }
  
  return 0;
};