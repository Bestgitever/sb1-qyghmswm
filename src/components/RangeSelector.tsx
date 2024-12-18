import React from 'react';
import { SelectedRange } from '../types/excel';

interface RangeSelectorProps {
  selectedRange: SelectedRange;
  maxRows: number;
  maxCols: number;
  onRangeChange: (range: SelectedRange) => void;
}

export function RangeSelector({ selectedRange, maxRows, maxCols, onRangeChange }: RangeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Row</label>
        <input
          type="number"
          min="0"
          max={maxRows}
          value={selectedRange.startRow}
          onChange={(e) =>
            onRangeChange({ ...selectedRange, startRow: parseInt(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Row</label>
        <input
          type="number"
          min="0"
          max={maxRows}
          value={selectedRange.endRow}
          onChange={(e) =>
            onRangeChange({ ...selectedRange, endRow: parseInt(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Column</label>
        <input
          type="number"
          min="0"
          max={maxCols}
          value={selectedRange.startCol}
          onChange={(e) =>
            onRangeChange({ ...selectedRange, startCol: parseInt(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Column</label>
        <input
          type="number"
          min="0"
          max={maxCols}
          value={selectedRange.endCol}
          onChange={(e) =>
            onRangeChange({ ...selectedRange, endCol: parseInt(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}