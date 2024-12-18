/**
 * Date formatting utilities
 */

// Excel stores dates as serial numbers (days since 1900-01-01)
const EXCEL_DATE_OFFSET = 25569; // Days between 1900-01-01 and 1970-01-01
const MS_PER_DAY = 86400000; // Milliseconds per day

export const formatDateString = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const excelDateToJSDate = (excelDate: number): Date => {
  return new Date((excelDate - EXCEL_DATE_OFFSET) * MS_PER_DAY);
};