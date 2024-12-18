import { useState, useCallback } from 'react';
import { ExcelData, ColumnSelection } from '../types/excel';
import { calculateColumnTotals } from '../utils/calculations/totalCalculator';

export function useCalculations() {
  const [totals, setTotals] = useState<Record<number, number>>({});

  const calculateColumnTotal = useCallback((
    data: ExcelData, 
    columnSelections: ColumnSelection[],
    getMultiplierForValue?: (value: number) => number | null
  ) => {
    const newTotals = calculateColumnTotals(data, columnSelections, getMultiplierForValue);
    setTotals(newTotals);
  }, []);

  const resetTotals = useCallback(() => {
    setTotals({});
  }, []);

  return {
    totals,
    calculateColumnTotal,
    resetTotals
  };
}