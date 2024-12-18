import { isExcelDate } from '../date/validators';
import { excelDateToJSDate, formatDateString } from '../date/formatters';

export const formatCellValue = (value: any, columnIndex: number, isSecondFile: boolean = false): string => {
  if (value === null || value === undefined) return '-';

  // For second file, format second column as date
  if (isSecondFile && columnIndex === 1) {
    if (isExcelDate(value)) {
      return formatDateString(excelDateToJSDate(value));
    }
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return formatDateString(date);
    }
  }

  // Format first column as date for both files
  if (columnIndex === 0) {
    if (isExcelDate(value)) {
      return formatDateString(excelDateToJSDate(value));
    }
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return formatDateString(date);
    }
  }

  return String(value);
};