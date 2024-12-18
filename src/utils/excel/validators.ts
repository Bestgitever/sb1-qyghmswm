import { ExcelData } from '../../types/excel';

export const validateHeaders = (headers: string[]): string | null => {
  if (!Array.isArray(headers) || headers.length === 0) {
    return 'Excel file must have at least one column';
  }

  const validHeaders = headers.some(header => 
    header !== null && header !== undefined && String(header).trim() !== ''
  );

  if (!validHeaders) {
    return 'Excel file must have at least one valid column header';
  }

  return null;
};

export const validateRows = (rows: any[][]): string | null => {
  if (!Array.isArray(rows)) {
    return 'Invalid Excel file format';
  }

  if (rows.length === 0) {
    return 'Excel file must contain data rows';
  }

  return null;
};

export const validateExcelFile = (data: ExcelData): string | null => {
  const headerError = validateHeaders(data.headers);
  if (headerError) return headerError;

  const rowError = validateRows(data.rows);
  if (rowError) return rowError;

  return null;
};