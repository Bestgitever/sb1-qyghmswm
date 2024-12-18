import { useState, useCallback } from 'react';
import { ExcelData, ColumnSelection } from '../../types/excel';
import { useExcelData } from '../useExcelData';
import { useColumnSelection } from '../useColumnSelection';
import { useCalculations } from '../useCalculations';
import { useMultiplierRules } from '../useMultiplierRules';

export function useCalculations2() {
  const { excelData, handleFileUpload } = useExcelData();
  const { 
    columnSelections, 
    handleColumnToggle, 
    handleColumnUpdate, 
    initializeColumns 
  } = useColumnSelection();
  const { 
    totals, 
    calculateColumnTotal, 
    resetTotals 
  } = useCalculations();
  const { 
    multiplierGroups, 
    updateMultiplier, 
    getMultiplierForValue 
  } = useMultiplierRules();

  const handleFile = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = await handleFileUpload(event);
    if (data) {
      initializeColumns(data.headers);
      resetTotals();
    }
  }, [handleFileUpload, initializeColumns, resetTotals]);

  const handleCalculate = useCallback(() => {
    if (excelData) {
      const selectedColumns = columnSelections.filter(col => col.selected);
      if (selectedColumns.length >= 4) {
        calculateColumnTotal(excelData, selectedColumns, getMultiplierForValue);
      } else {
        calculateColumnTotal(excelData, selectedColumns);
      }
    }
  }, [excelData, columnSelections, calculateColumnTotal, getMultiplierForValue]);

  const selectedColumns = columnSelections.filter(col => col.selected);

  return {
    state: {
      excelData,
      columnSelections,
      selectedColumns,
      multiplierGroups,
      totals
    },
    handlers: {
      handleFileUpload: handleFile,
      handleColumnToggle,
      handleColumnUpdate,
      handleMultiplierChange: updateMultiplier,
      handleCalculate
    }
  };
}