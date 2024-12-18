/**
 * Check value calculation utilities
 */
import { CHECK1_PATTERNS, CHECK1_MULTIPLIER } from './constants';
import { hasPattern } from './validators';

export const hasCheck1Text = (text: string): boolean => {
  return hasPattern(text, CHECK1_PATTERNS);
};

export const calculateCheck1 = (
  columnSixValue: any,
  nakupBAL: number | null,
  pocetBAL: number | null
): number | null => {
  if (!columnSixValue || nakupBAL === null || pocetBAL === null) return null;
  
  const textValue = String(columnSixValue);
  if (hasCheck1Text(textValue)) {
    // Using updated multiplier (1.004)
    return (nakupBAL / pocetBAL) * CHECK1_MULTIPLIER;
  }
  
  return null;
};