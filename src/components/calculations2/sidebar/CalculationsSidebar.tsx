import React from 'react';
import { FileUploader } from '../../FileUploader';
import { ColumnSelector } from '../../ColumnSelector';
import { CalculationsTotals } from './CalculationsTotals';
import { ExcelData, ColumnSelection } from '../../../types/excel';
import { MultiplierGroup } from '../../../utils/multiplierRules/types';

interface CalculationsSidebarProps {
  excelData: ExcelData | null;
  columnSelections: ColumnSelection[];
  selectedColumns: ColumnSelection[];
  multiplierGroups: MultiplierGroup[];
  totals: Record<number, number>;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColumnToggle: (index: number) => void;
  onMultiplierChange: (groupId: string, value: number) => void;
  onCalculate: () => void;
}

export function CalculationsSidebar({
  excelData,
  columnSelections,
  selectedColumns,
  multiplierGroups,
  totals,
  onFileUpload,
  onColumnToggle,
  onMultiplierChange,
  onCalculate
}: CalculationsSidebarProps) {
  const showMultipliers = selectedColumns.length >= 4;

  return (
    <div>
      <FileUploader onFileUpload={onFileUpload} label="Upload Excel File" />
      {excelData && (
        <div className="space-y-4">
          <ColumnSelector
            columns={columnSelections}
            onColumnToggle={onColumnToggle}
            onToggleAll={() => {}}
          />
          <CalculationsTotals
            selectedColumns={selectedColumns}
            multiplierGroups={multiplierGroups}
            totals={totals}
            showMultipliers={showMultipliers}
            onMultiplierChange={onMultiplierChange}
            onCalculate={onCalculate}
          />
        </div>
      )}
    </div>
  );
}