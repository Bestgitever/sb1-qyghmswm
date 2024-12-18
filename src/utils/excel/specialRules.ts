/**
 * Special rules for value calculations based on column content
 */

// Define the special values that trigger different multipliers
const SPECIAL_VALUES = {
  EIGHT_MULTIPLIER: [
    '22´', '25´', '27´', '40s'
  ],
  FIVE_MULTIPLIER: [
    '40´'
  ],
  ONE_MULTIPLIER: [
    '15mg', '15,6mg', '20mg', '16,5mg',
    '12mg', '18mg', '14,3mg', '8,6mg',
    'Sleva'
  ]
} as const;

// Define special text patterns for check1 calculation
const CHECK1_PATTERNS = [
  'TEREA',
  'HEETS',
  'VEO',
  'FIIT',
  'Zapalovač',
  'Siberia',
  'Cig. papírky',
  'cig.tab.',
  'cigaretový tabák'
];

// Define discount text patterns
const DISCOUNT_PATTERNS = [
  'Sleva 1,-',
  'Sleva 1 Kč',
  'Fakturační sleva'
];

/**
 * Checks if a value is empty or represents a null value
 */
const isEmptyValue = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  const stringValue = String(value).trim();
  return stringValue === '' || stringValue === '-';
};

/**
 * Determines if the text contains any of the check1 patterns
 */
export const hasCheck1Text = (text: string): boolean => {
  return CHECK1_PATTERNS.some(pattern => 
    text.toLowerCase().includes(pattern.toLowerCase())
  );
};

/**
 * Calculates check1 value based on special text and values
 */
export const calculateCheck1 = (
  columnSixValue: any,
  nakupBAL: number | null,
  pocetBAL: number | null
): number | null => {
  if (!columnSixValue || nakupBAL === null || pocetBAL === null) return null;
  
  const textValue = String(columnSixValue);
  if (hasCheck1Text(textValue)) {
    // Changed multiplier to 1.005
    return (nakupBAL / pocetBAL) * 1.005;
  }
  
  return null;
};

/**
 * Determines if the text contains any of the discount patterns
 */
export const hasDiscountText = (text: string): boolean => {
  return DISCOUNT_PATTERNS.some(pattern => 
    text.toLowerCase().includes(pattern.toLowerCase())
  );
};

/**
 * Gets the absolute value from column 7 if discount text is present, otherwise returns 0
 */
export const getDiscountValue = (columnSixValue: any, columnSevenValue: any): number => {
  if (!columnSixValue || !columnSevenValue) return 0;
  
  const textValue = String(columnSixValue);
  if (hasDiscountText(textValue)) {
    const numValue = parseFloat(columnSevenValue);
    return isNaN(numValue) ? 0 : Math.abs(numValue);
  }
  
  return 0;
};

/**
 * Determines the special value based on column content
 */
export const getSpecialValue = (columnValue: any): number => {
  if (isEmptyValue(columnValue)) {
    return 0;
  }
  
  const stringValue = String(columnValue).trim();

  if (SPECIAL_VALUES.EIGHT_MULTIPLIER.some(val => stringValue.includes(val))) {
    return 8;
  }

  if (SPECIAL_VALUES.FIVE_MULTIPLIER.some(val => stringValue.includes(val))) {
    return 5;
  }

  if (SPECIAL_VALUES.ONE_MULTIPLIER.some(val => stringValue.includes(val))) {
    return 1;
  }

  return 10;
};