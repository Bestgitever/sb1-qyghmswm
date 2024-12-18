import { read, utils } from 'xlsx';

// Excel stores dates as serial numbers (days since 1900-01-01)
const EXCEL_DATE_OFFSET = 25569; // Days between 1900-01-01 and 1970-01-01
const MS_PER_DAY = 86400000; // Milliseconds per day

export const isExcelDate = (value: any): boolean => {
  if (typeof value !== 'number') return false;
  // Excel dates are typically between 0 (1900-01-01) and current date
  return value > 0 && value < 50000;
};

export const excelDateToJSDate = (excelDate: number): Date => {
  // Convert Excel date to JavaScript date
  return new Date((excelDate - EXCEL_DATE_OFFSET) * MS_PER_DAY);
};

export const formatDate = (value: any): string => {
  if (!value) return '';
  
  // Handle Excel date numbers
  if (isExcelDate(value)) {
    const date = excelDateToJSDate(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  // Handle regular date strings
  const date = new Date(value);
  if (date instanceof Date && !isNaN(date.getTime())) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  // Return original value if not a valid date
  return String(value);
};