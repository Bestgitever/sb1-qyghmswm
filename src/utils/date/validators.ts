/**
 * Date validation utilities
 */

export const isExcelDate = (value: any): boolean => {
  if (typeof value !== 'number') return false;
  return value > 0 && value < 50000; // Excel dates are typically between 0 (1900-01-01) and current date
};

export const isValidDateString = (value: string): boolean => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};