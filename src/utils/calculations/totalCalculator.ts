import { ExcelData, ColumnSelection } from '../../types/excel';
import { calculateColumnValue } from './columnCalculator';
import { filterRows } from './rowFilter';

export function calculateColumnTotals(
  data: ExcelData,
  columnSelections: ColumnSelection[],
  getMultiplierForValue?: (value: number) => number | null
): Record<number, number> {
  if (!data || columnSelections.length < 4) return {};

  const selectedColumns = columnSelections.filter(col => col.selected);
  if (selectedColumns.length < 4) return {};

  const filteredRows = filterRows(data.rows, selectedColumns);
  const totals: Record<number, number> = {};
  
  // Calculate totals only for columns after the first three
  selectedColumns.slice(3).forEach((col) => {
    const total = filteredRows.reduce((sum, currentRow) => {
      const value = calculateColumnValue(
        currentRow,
        col.index,
        selectedColumns,
        getMultiplierForValue
      );
      return sum + value;
    }, 0);

    totals[col.index] = total;
  });

  return totals;
}