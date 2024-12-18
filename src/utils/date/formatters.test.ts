import { formatDateString, excelDateToJSDate } from './formatters';

describe('formatDateString', () => {
  it('formats date correctly', () => {
    const date = new Date(2024, 2, 15); // March 15, 2024
    expect(formatDateString(date)).toBe('15.03.2024');
  });

  it('pads single digits', () => {
    const date = new Date(2024, 0, 5); // January 5, 2024
    expect(formatDateString(date)).toBe('05.01.2024');
  });
});

describe('excelDateToJSDate', () => {
  it('converts Excel date to JS date', () => {
    const excelDate = 44970; // Example Excel date
    const jsDate = excelDateToJSDate(excelDate);
    expect(jsDate).toBeInstanceOf(Date);
  });
});