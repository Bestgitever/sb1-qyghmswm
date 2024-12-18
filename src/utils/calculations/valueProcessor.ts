import { parseNumericValue } from '../numberUtils';

export const processNumericValue = (value: any): number => {
  const parsedValue = parseNumericValue(value);
  return parsedValue ?? 0;
};