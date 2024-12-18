import React from 'react';
import { SelectedColumnsTable } from '../../SelectedColumnsTable';
import { ExcelData, ColumnSelection } from '../../../types/excel';

interface CalculationsContentProps {
  excelData: ExcelData | null;
  columnSelections: ColumnSelection[];
  onColumnUpdate: (updatedColumn: ColumnSelection) => void;
}

export function CalculationsContent({
  excelData,
  columnSelections,
  onColumnUpdate
}: CalculationsContentProps) {
  if (!excelData) return null;

  return (
    <SelectedColumnsTable
      data={excelData}
      columnSelections={columnSelections}
      onColumnUpdate={onColumnUpdate}
    />
  );
}