import { ColumnSelection } from '../../types/excel';
import { processNumericValue } from './valueProcessor';
import { 
  calculateMultipliedValue, 
  shouldApplyMultiplier,
  getThirdColumnValue 
} from './multiplierCalculator';

export const calculateColumnValue = (
  currentRow: any[],
  columnIndex: number,
  selectedColumns: ColumnSelection[],
  getMultiplierForValue?: (value: number) => number | null
): number => {
  const value = processNumericValue(currentRow[columnIndex]);
  
  if (shouldApplyMultiplier(columnIndex, selectedColumns)) {
    const thirdColumnValue = getThirdColumnValue(currentRow, selectedColumns);
    if (thirdColumnValue !== null) {
      return calculateMultipliedValue(value, thirdColumnValue, getMultiplierForValue);
    }
  }

  return value;
};