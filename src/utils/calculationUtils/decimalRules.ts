/**
 * Rules for decimal-based calculations
 */
export const calculateDecimalBasedValue = (value: string | number | null): number => {
  if (!value) return 10; // Default value if no input

  const stringValue = String(value);
  
  // Extract decimal part if exists
  const decimalMatch = stringValue.match(/\.(\d+)$/);
  if (!decimalMatch) return 10; // No decimal found
  
  const decimal = decimalMatch[1];
  
  // Check for exact matches
  if (decimal === '22' || decimal === '25' || decimal === '27') {
    return 8;
  }
  
  if (decimal === '40') {
    return 5;
  }
  
  return 10; // Default value
};