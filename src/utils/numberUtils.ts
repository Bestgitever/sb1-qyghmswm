export const parseNumericValue = (value: any): number | null => {
  if (typeof value === 'number') {
    return value;
  }
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

export const formatNumber = (value: number | undefined): string => {
  if (value === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(value);
};