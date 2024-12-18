import React from 'react';
import { ColumnSelection } from '../types/excel';
import { formatNumber } from '../utils/numberUtils';

interface ColumnTotalsProps {
  selectedColumns: ColumnSelection[];
  totals: Record<number, number>;
}

export function ColumnTotals({ selectedColumns, totals }: ColumnTotalsProps) {
  // Skip first three columns and only show remaining columns
  const displayColumns = selectedColumns.slice(3);

  if (displayColumns.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        Select more columns to view totals
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayColumns.map((col, index) => {
        const isFirstCalculatedColumn = index === 0;
        return (
          <div key={col.index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate">
              {col.label}
              {isFirstCalculatedColumn && (
                <span className="text-xs text-blue-600 ml-1">
                  (with multipliers applied)
                </span>
              )}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {formatNumber(totals[col.index])}
            </span>
          </div>
        );
      })}
    </div>
  );
}