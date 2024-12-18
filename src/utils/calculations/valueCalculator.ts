import { parseNumericValue } from '../numberUtils';
import { MultiplierGroup } from '../types/multiplier';

export function calculateColumnValue(
  row: any[],
  columnIndex: number,
  secondColumnValue: number | null,
  customMultipliers?: MultiplierGroup[]
): number {
  const value = parseNumericValue(row[columnIndex]);
  if (value === null) return 0;

  if (secondColumnValue !== null && customMultipliers) {
    for (const group of customMultipliers) {
      if (group.values.includes(secondColumnValue)) {
        return value * group.multiplier;
      }
    }
  }

  return value;
}