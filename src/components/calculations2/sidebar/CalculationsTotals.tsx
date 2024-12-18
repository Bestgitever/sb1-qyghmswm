import React from 'react';
import { ColumnSelection } from '../../../types/excel';
import { MultiplierGroup } from '../../../utils/multiplierRules/types';
import { MultiplierInput } from '../../MultiplierInput';
import { ColumnTotals } from '../../ColumnTotals';

interface CalculationsTotalsProps {
  selectedColumns: ColumnSelection[];
  multiplierGroups: MultiplierGroup[];
  totals: Record<number, number>;
  showMultipliers: boolean;
  onMultiplierChange: (groupId: string, value: number) => void;
  onCalculate: () => void;
}

export function CalculationsTotals({
  selectedColumns,
  multiplierGroups,
  totals,
  showMultipliers,
  onMultiplierChange,
  onCalculate
}: CalculationsTotalsProps) {
  if (selectedColumns.length === 0) return null;

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Column Totals</h3>
      {showMultipliers && (
        <MultiplierInput
          groups={multiplierGroups}
          onMultiplierChange={onMultiplierChange}
        />
      )}
      <button
        onClick={onCalculate}
        className="w-full mb-3 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={selectedColumns.length < 4}
      >
        Calculate All Totals
      </button>
      {selectedColumns.length < 4 ? (
        <div className="text-sm text-gray-500 italic">
          Select at least 4 columns to calculate totals
        </div>
      ) : (
        <ColumnTotals
          selectedColumns={selectedColumns}
          totals={totals}
        />
      )}
    </div>
  );
}