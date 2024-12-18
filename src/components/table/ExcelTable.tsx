import React, { useCallback } from 'react';
import { ExcelData, CellRange } from '../../types/excel';
import { TableContainer } from './TableContainer';
import { StickyHeader } from './StickyHeader';
import { TableCell } from './TableCell';
import { useTableSelection } from '../../hooks/useTableSelection';
import { isInRange } from '../../utils/tableUtils';
import { formatDate } from '../../utils/dateUtils';

interface ExcelTableProps {
  data: ExcelData;
  onRangeSelect?: (range: CellRange) => void;
}

export function ExcelTable({ data, onRangeSelect }: ExcelTableProps) {
  const { selection, handleMouseDown, handleMouseMove, handleMouseUp } = useTableSelection(onRangeSelect);

  const formatCellValue = useCallback((value: any, colIndex: number): string => {
    return colIndex === 0 ? formatDate(value) : String(value);
  }, []);

  return (
    <TableContainer>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <StickyHeader>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 z-10"
              >
                {header}
              </th>
            ))}
          </StickyHeader>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    value={formatCellValue(cell, colIndex)}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isSelected={selection.range ? isInRange(rowIndex, colIndex, selection.range) : false}
                    isSelecting={selection.isSelecting}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
                    onMouseUp={handleMouseUp}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableContainer>
  );
}