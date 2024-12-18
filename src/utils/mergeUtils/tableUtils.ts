import { MergedData } from './types';

export const getVisibleData = (
  data: MergedData,
  visibleColumns: Record<number, boolean>
) => {
  const visibleHeaders = data.headers.filter((_, index) => visibleColumns[index]);
  const visibleIndices = data.headers
    .map((_, index) => index)
    .filter(index => visibleColumns[index]);

  const visibleRows = data.rows.map(row =>
    visibleIndices.map(index => row[index])
  );

  return {
    headers: visibleHeaders,
    rows: visibleRows,
    indices: visibleIndices
  };
};

export const isDuplicateRow = (
  rowIndex: number,
  duplicates: Map<string, number[]>
): boolean => {
  for (const indices of duplicates.values()) {
    if (indices.includes(rowIndex) && indices[0] !== rowIndex) {
      return true;
    }
  }
  return false;
};