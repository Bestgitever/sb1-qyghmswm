import { ExcelData, ColumnSelection } from '../types/excel';
import { applyFilters } from './filterUtils';
import { parseNumericValue } from './numberUtils';
import { getMultiplierForValue } from './multiplierRules';

const calculateColumnValue = (
  row: any[],
  columnIndex: number,
  secondColumnValue: number | null
): number => {
  const value = parseNumericValue(row[columnIndex]);
  if (value === null) return 0;

  if (secondColumnValue !== null) {
    const multiplier = getMultiplierForValue(secondColumnValue);
    if (multiplier !== null) {
      return value * multiplier;
    }
  }

  return value;
};

export const calculateColumnTotals = (
  data: ExcelData,
  columnSelections: ColumnSelection[]
): Record<number, number> => {
  if (!data || !columnSelections.length) return {};

  const selectedColumns = columnSelections.filter(col => col.selected);
  if (selectedColumns.length === 0) return {};

  // Filter rows based on column filters
  const filteredRows = data.rows.filter(row =>
    selectedColumns.every((col) =>
      applyFilters(row[col.index], col.filters || [])
    )
  );

  // Calculate totals (skip first and second selected columns)
  const totals: Record<number, number> = {};
  
  selectedColumns.forEach((col, selectedIndex) => {
    // Skip first and second selected columns
    if (selectedIndex === 0 || selectedIndex === 1) {
      totals[col.index] = selectedColumns.length;
      return;
    }

    const total = filteredRows.reduce((sum, row) => {
      // For third column, check second column value for multiplier
      if (selectedIndex === 2 && selectedColumns[1]) {
        const secondColumnValue = parseNumericValue(row[selectedColumns[1].index]);
        return sum + calculateColumnValue(row, col.index, secondColumnValue);
      }

      // For other columns, just sum the values
      const value = parseNumericValue(row[col.index]);
      return sum + (value || 0);
    }, 0);

    totals[col.index] = total;
  });

  return totals;
};