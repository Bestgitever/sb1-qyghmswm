// Constants for price extraction
const EXTRACTION_CONFIG = {
  CHARS_FROM_RIGHT: 8,
  DECIMAL_SEPARATOR: '.',
  THOUSAND_SEPARATOR: ','
} as const;

// Regular expression to match numbers with optional decimals within specified chars from the right
const createPriceRegex = (charsFromRight: number) => 
  new RegExp(`[+-]?\\d+(?:[.,]\\d+)?(?=\\D{0,${charsFromRight}}$)`);

const PRICE_REGEX = createPriceRegex(EXTRACTION_CONFIG.CHARS_FROM_RIGHT);

/**
 * Extracts a price from text, looking for numbers within 8 characters from the right
 * @param text The text to extract price from
 * @returns The extracted price as a number, or null if no price found
 */
export const extractPrice = (text: string | null): number | null => {
  if (!text) return null;
  
  // Convert to string and normalize spaces
  const normalized = String(text).trim();
  
  // Find price pattern within specified chars from the right
  const match = normalized.match(PRICE_REGEX);
  if (!match) return null;
  
  // Clean up the matched number
  const price = match[0]
    .replace(EXTRACTION_CONFIG.THOUSAND_SEPARATOR, '') // Remove thousand separators
    .replace(',', EXTRACTION_CONFIG.DECIMAL_SEPARATOR); // Normalize decimal separator
  
  const number = parseFloat(price);
  return isNaN(number) ? null : number;
};