/**
 * Column linking utilities
 */

export const getLinkedValue = (
  sourceData: any[][],
  lookupValue: any,
  valueColumnIndex: number
): any => {
  if (!lookupValue) return null;
  
  // Convert lookup value to string for comparison
  const lookupString = String(lookupValue).trim();
  
  // Find matching row in source data
  const matchingRow = sourceData.find(row => 
    String(row[0]).trim() === lookupString
  );
  
  return matchingRow ? matchingRow[valueColumnIndex] : null;
};