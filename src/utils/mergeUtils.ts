import { ExcelData, ColumnSelection } from '../types/excel';
import { MergedData } from './mergeUtils/types';
import { extractPrice } from './priceUtils';
import { calculateSpecialCharacterValue } from './calculationUtils/specialCharacterRules';

export const mergeTables = (
  firstData: ExcelData | null,
  secondData: ExcelData | null,
  firstColumns: ColumnSelection[],
  secondColumns: ColumnSelection[],
  keyColumnIndex: number = 0
): MergedData | null => {
  if (!firstData || !secondData) return null;

  const firstSelected = firstColumns.filter(col => col.selected);
  const secondSelected = secondColumns.filter(col => col.selected);

  if (firstSelected.length === 0 || secondSelected.length === 0) return null;

  // Create merged headers with Czech names for calculated columns
  const mergedHeaders = [
    ...firstSelected.map(col => `File 1: ${col.label}`),
    ...secondSelected.map(col => `File 2: ${col.label}`),
    'Prodej Cena',     // Renamed from 'Extracted Price'
    'Počet',           // Renamed from 'Special Character Value'
    'Prodej Celkem'    // Renamed from 'Calculated Total'
  ];

  // Process first table rows
  const firstRows = firstData.rows.map(row => {
    const selectedValues = firstSelected.map(col => row[col.index]);
    const price = extractPrice(String(selectedValues[1] || '')); // Extract from second column
    const specialValue = calculateSpecialCharacterValue(selectedValues[1]); // Calculate from second column
    const calculatedTotal = price !== null ? price * specialValue : null; // Calculate total
    return [...selectedValues, price, specialValue, calculatedTotal];
  });

  // Create lookup map for first table
  const firstTableMap = new Map(
    firstRows.map((row, index) => [String(row[0]), { row, index }])
  );

  const mergedRows: any[][] = [];
  const seenKeys = new Map<string, number[]>();

  // Add rows from first table
  firstRows.forEach((row, index) => {
    const key = String(row[0]);
    const values = row.slice(0, -3); // Exclude price, special value, and total
    mergedRows.push([
      ...values,
      ...Array(secondSelected.length).fill(null),
      row[row.length - 3], // Add extracted price
      row[row.length - 2], // Add special character value
      row[row.length - 1]  // Add calculated total
    ]);
    seenKeys.set(key, [index]);
  });

  // Process second table rows
  secondData.rows.forEach((dataRow, secondIndex) => {
    const row = secondSelected.map(col => dataRow[col.index]);
    const key = String(row[0]);
    const price = extractPrice(String(row[1] || '')); // Extract from second column
    const specialValue = calculateSpecialCharacterValue(row[1]); // Calculate from second column
    const calculatedTotal = price !== null ? price * specialValue : null; // Calculate total

    if (firstTableMap.has(key)) {
      const { index: firstIndex } = firstTableMap.get(key)!;
      // Update existing row
      mergedRows[firstIndex] = [
        ...mergedRows[firstIndex].slice(0, firstSelected.length),
        ...row,
        price,
        specialValue,
        calculatedTotal
      ];
      
      const indices = seenKeys.get(key) || [];
      indices.push(firstIndex);
      seenKeys.set(key, indices);
    } else {
      // Add new row
      const newIndex = mergedRows.length;
      mergedRows.push([
        ...Array(firstSelected.length).fill(null),
        ...row,
        price,
        specialValue,
        calculatedTotal
      ]);
      
      const indices = seenKeys.get(key) || [];
      indices.push(newIndex);
      seenKeys.set(key, indices);
    }
  });

  // Create duplicates map
  const duplicates = new Map(
    Array.from(seenKeys.entries())
      .filter(([_, indices]) => indices.length > 1)
  );

  return {
    headers: mergedHeaders,
    rows: mergedRows,
    duplicates
  };
};