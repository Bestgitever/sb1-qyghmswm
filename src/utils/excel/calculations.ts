/**
 * Excel calculations utilities
 */
import { extractPrice } from './priceExtractor';
import { getSpecialValue, getDiscountValue, calculateCheck1 } from './specialRules';
import { getLinkedValue } from './linkColumns';

const parseNumericValue = (value: any): number | null => {
  if (value === null || value === undefined) return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
};

export const calculateCheck2 = (
  check3: number | null,
  check0: number | null,
  check1: number | null
): number | null => {
  if (check0 === null || (check3 === null && check1 === null)) return null;
  
  // If check0 is positive, use check3
  // If check0 is negative, use check1 * 10
  return check0 > 0 ? check3 : (check1 !== null ? check1 * 10 : null);
};

export const addCalculatedColumns = (data: any[][], firstFileData: any[][] | null = null): any[][] => {
  return data.map(row => {
    // Extract price from column 6
    const extractedPrice = extractPrice(String(row[5]));
    
    // Calculate division result (10Nákup/BAL)
    const calculatedValue = calculateDerivedValue(row, {
      sourceColumn: 6,
      divideColumn: 8,
      checkColumn: 5
    });

    // Get special value based on column 6 content (11BAL)
    const specialValue = getSpecialValue(row[5]);

    // Calculate check3 (18 = 12 * 11)
    const check3 = extractedPrice !== null && specialValue !== null ? 
      extractedPrice * specialValue : null;

    // Calculate check1 value based on special text in column 6
    const check1 = calculateCheck1(row[5], calculatedValue, specialValue);

    // Calculate Check0 (15 = 13 - 10)
    const check0 = check3 !== null && calculatedValue !== null ?
      check3 - calculatedValue : null;

    // Calculate check2 (17) based on Check0 (15)
    const check2 = calculateCheck2(check3, check0, check1);

    // Get value from column 7 if discount text is present in column 6 (Slevy)
    const discountValue = getDiscountValue(row[5], row[6]);

    // Calculate Zisk/KS (19 = 13 - 10)
    const ziskKS = check2 !== null && calculatedValue !== null ?
      check2 - calculatedValue : null;

    return [
      ...row,
      calculatedValue,   // 10Nákup/BAL
      specialValue,      // 11BAL
      extractedPrice,    // 12Prodej/BAL
      check2,           // 13Check
      discountValue,     // Slevy
      check0,           // 15Check0
      check1,           // 16check1
      check2,           // 17check2
      check3,           // 18Check3
      ziskKS            // 19Zisk/KS
    ];
  });
};

export const calculateDerivedValue = (row: any[], options: {
  sourceColumn: number,
  divideColumn: number,
  checkColumn: number
}): number | null => {
  const { sourceColumn, divideColumn, checkColumn } = options;
  
  const checkValue = row[checkColumn];
  if (checkValue === null || checkValue === undefined || String(checkValue).trim() === '') {
    return null;
  }

  const sourceValue = parseNumericValue(row[sourceColumn]);
  const divideValue = parseNumericValue(row[divideColumn]);

  if (sourceValue !== null && divideValue !== null && divideValue !== 0) {
    return sourceValue / divideValue;
  }

  return null;
};