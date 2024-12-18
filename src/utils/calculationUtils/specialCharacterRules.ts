/**
 * Rules for special character-based calculations
 */

// Regular expression for mg values
const MG_VALUES = [
  '15mg', '15,6mg', '20mg', '16,5mg',
  '12mg', '18mg', '14,3mg', '8,6mg'
];

export const calculateSpecialCharacterValue = (value: string | number | null): number => {
  if (!value) return 10; // Default value if no input
  
  const stringValue = String(value).toLowerCase();
  
  // Check for special characters with ´ or s
  if (stringValue.includes('22´') || 
      stringValue.includes('25´') || 
      stringValue.includes('27´')) {
    return 8;
  }
  
  if (stringValue.includes('40´') || stringValue.includes('40s')) {
    return 5;
  }

  // Check for mg values
  // First normalize the value by replacing comma with dot for consistency
  const normalizedValue = stringValue.replace(',', '.');
  if (MG_VALUES.some(mgValue => 
    normalizedValue.includes(mgValue.replace(',', '.'))
  )) {
    return 1;
  }
  
  return 10; // Default value
};