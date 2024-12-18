/**
 * Checks if a value is a valid column header content (text or number)
 */
export const isValidColumnContent = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (value === '') return false;
  
  // Check for numbers
  if (typeof value === 'number') return true;
  
  // Check for strings
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0;
  }
  
  return false;
};

/**
 * Validates the entire Excel file structure
 */
export const validateExcelFile = (headers: string[], rows: any[][]): string | null => {
  if (!Array.isArray(headers) || headers.length === 0) {
    return 'Excel file must have at least one column';
  }

  if (!Array.isArray(rows)) {
    return 'Invalid Excel file format';
  }

  const validHeaders = headers.some(header => isValidColumnContent(header));
  if (!validHeaders) {
    return 'Excel file must have at least one valid column header';
  }

  return null;
};