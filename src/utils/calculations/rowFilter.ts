import { ColumnSelection } from '../../types/excel';
import { applyFilters } from '../filterUtils';

export const filterRows = (
  rows: any[][],
  selectedColumns: ColumnSelection[]
): any[][] => {
  return rows.filter(row =>
    selectedColumns.every((col) =>
      applyFilters(row[col.index], col.filters || [])
    )
  );
};