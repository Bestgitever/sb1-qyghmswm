/**
 * Validation utilities for special rules
 */

export const isEmptyValue = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  const stringValue = String(value).trim();
  return stringValue === '' || stringValue === '-';
};

export const hasPattern = (text: string, patterns: readonly string[]): boolean => {
  return patterns.some(pattern => 
    text.toLowerCase().includes(pattern.toLowerCase())
  );
};