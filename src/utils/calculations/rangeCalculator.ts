import { ExcelData } from '../../types/excel';
import { processNumericValue } from './valueProcessor';

export const calculateRangeTotal = (
  data: ExcelData,
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number
): number => {
  let total = 0;

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      total += processNumericValue(data.rows[i][j]);
    }
  }

  return total;
};