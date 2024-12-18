import { VisibleColumns } from './types';

export const toggleColumnVisibility = (
  visibleColumns: VisibleColumns,
  columnIndex: number
): VisibleColumns => {
  return {
    ...visibleColumns,
    [columnIndex]: !visibleColumns[columnIndex]
  };
};

export const initializeVisibleColumns = (totalColumns: number): VisibleColumns => {
  return Array(totalColumns)
    .fill(true)
    .reduce((acc, _, index) => ({ ...acc, [index]: true }), {});
};