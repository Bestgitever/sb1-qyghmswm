import { useMemo } from 'react';
import { ExcelData, ColumnSelection } from '../types/excel';
import { sortData } from '../utils/columnUtils';
import { applyFilters } from '../utils/filterUtils';

export function useProcessedData(
  data: ExcelData,
  columnSelections: ColumnSelection[]
): { 
  processedData: ExcelData | null;
  uniqueValues: Map<number, Set<any>>;
} {
  return useMemo(() => {
    if (!data || !columnSelections.length) {
      return { processedData: null, uniqueValues: new Map() };
    }

    // Get selected columns
    const selectedColumns = columnSelections.filter(col => col.selected);
    if (selectedColumns.length === 0) {
      return { processedData: null, uniqueValues: new Map() };
    }

    // Map selected indices
    const selectedIndices = selectedColumns.map(col => col.index);

    // Calculate unique values for each column
    const uniqueValues = new Map<number, Set<any>>();
    selectedIndices.forEach((colIndex, i) => {
      uniqueValues.set(i, new Set(data.rows.map(row => row[colIndex])));
    });

    // Filter and transform data
    let processedRows = data.rows.filter(row =>
      selectedIndices.every((colIndex, i) =>
        applyFilters(row[colIndex], selectedColumns[i].filters || [])
      )
    ).map(row => selectedIndices.map(i => row[i]));

    // Apply sorting
    const sortColumn = selectedColumns.find(col => col.sortDirection);
    if (sortColumn) {
      const columnIndex = selectedColumns.findIndex(col => col.index === sortColumn.index);
      if (columnIndex !== -1) {
        processedRows = sortData(processedRows, columnIndex, sortColumn.sortDirection!);
      }
    }

    return {
      processedData: {
        headers: selectedColumns.map(col => col.label),
        rows: processedRows
      },
      uniqueValues
    };
  }, [data, columnSelections]);
}