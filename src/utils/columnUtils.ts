import { ColumnSelection, ExcelData, AggregationType } from '../types/excel';

export const createColumnSelection = (headers: string[], selectAll: boolean = false): ColumnSelection[] => {
  return headers.map((header, index) => ({
    index,
    label: header,
    selected: selectAll,
    sortDirection: null,
    groupBy: false,
    aggregation: null,
    width: 150,
    frozen: false,
    filters: [],
    selectedValues: new Set()
  }));
};

export const toggleAllColumns = (columns: ColumnSelection[], selected: boolean): ColumnSelection[] => {
  return columns.map(col => ({
    ...col,
    selected
  }));
};

export const areAllColumnsSelected = (columns: ColumnSelection[]): boolean => {
  return columns.every(col => col.selected);
};

export const sortData = (rows: any[][], columnIndex: number, direction: 'asc' | 'desc'): any[][] => {
  return [...rows].sort((a, b) => {
    const valueA = a[columnIndex];
    const valueB = b[columnIndex];

    // Handle null/undefined values
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return direction === 'asc' ? -1 : 1;
    if (valueB == null) return direction === 'asc' ? 1 : -1;

    // Check if values are numbers
    const numA = Number(valueA);
    const numB = Number(valueB);
    if (!isNaN(numA) && !isNaN(numB)) {
      return direction === 'asc' ? numA - numB : numB - numA;
    }

    // Sort as strings
    const strA = String(valueA).toLowerCase();
    const strB = String(valueB).toLowerCase();
    if (direction === 'asc') {
      return strA.localeCompare(strB);
    } else {
      return strB.localeCompare(strA);
    }
  });
};

export const filterBySelectedColumns = (data: ExcelData, selectedColumns: ColumnSelection[]): ExcelData => {
  const selectedIndices = selectedColumns
    .filter(col => col.selected)
    .map(col => col.index);

  return {
    headers: selectedIndices.map(index => data.headers[index]),
    rows: data.rows.map(row => selectedIndices.map(index => row[index]))
  };
};

export const calculateAggregation = (
  data: any[],
  type: AggregationType
): number | null => {
  if (!data.length || !type) return null;

  const numbers = data
    .map(value => typeof value === 'string' ? parseFloat(value) : value)
    .filter(num => !isNaN(num));

  if (!numbers.length) return null;

  switch (type) {
    case 'sum':
      return numbers.reduce((acc, curr) => acc + curr, 0);
    case 'average':
      return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    case 'count':
      return numbers.length;
    case 'min':
      return Math.min(...numbers);
    case 'max':
      return Math.max(...numbers);
    default:
      return null;
  }
};