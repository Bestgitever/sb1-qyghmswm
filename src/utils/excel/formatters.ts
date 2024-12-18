import { formatDateString, excelDateToJSDate } from '../date/formatters';
import { isExcelDate } from '../date/validators';

export const formatCalculatedValue = (value: any): string => {
  if (value === null || value === undefined) return '-';
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '-';
  
  // For special values (11BAL), return without decimals
  return Number.isInteger(numValue) ? String(numValue) : numValue.toFixed(2);
};

export const formatCellValue = (
  value: any, 
  columnIndex: number, 
  isSecondFile: boolean = false, 
  totalColumns: number = 0
): string => {
  if (value === null || value === undefined) return '-';

  // For second file's calculated columns
  if (isSecondFile) {
    // For 11BAL column (show without decimals)
    if (columnIndex === totalColumns - 5) {
      return String(value);
    }

    // For Slevy column (no formatting needed)
    if (columnIndex === totalColumns - 2) {
      return value === null ? '-' : String(value);
    }

    // For monetary columns (10Nákup/BAL, 12Prodej/BAL, 13Prodej s DPH, 15Marže Kč)
    if ([totalColumns - 6, totalColumns - 4, totalColumns - 3, totalColumns - 1].includes(columnIndex)) {
      return formatCalculatedValue(value);
    }

    // For second column as date
    if (columnIndex === 1) {
      if (isExcelDate(value)) {
        return formatDateString(excelDateToJSDate(value));
      }
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return formatDateString(date);
      }
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