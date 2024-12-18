import { ColumnSelection } from '../../types/excel';
import { processNumericValue } from './valueProcessor';

export const calculateMultipliedValue = (
  value: number,
  thirdColumnValue: number,
  getMultiplierForValue?: (value: number) => number | null
): number => {
  if (!getMultiplierForValue) return value;
  
  const multiplier = getMultiplierForValue(thirdColumnValue);
  return multiplier !== null ? value * multiplier : value;
};

export const shouldApplyMultiplier = (
  columnIndex: number,
  selectedColumns: ColumnSelection[]
): boolean => {
  const columnPosition = selectedColumns.findIndex(col => col.index === columnIndex);
  return columnPosition === 3; // Fourth selected column
};

export const getThirdColumnValue = (
  row: any[],
  selectedColumns: ColumnSelection[]
): number | null => {
  if (selectedColumns.length < 3) return null;
  
  const thirdColumnIndex = selectedColumns[2].index;
  return processNumericValue(row[thirdColumnIndex]);
};