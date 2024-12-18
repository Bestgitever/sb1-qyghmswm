import React, { useMemo } from 'react';
import { TableContainer } from '../table/TableContainer';
import { StickyHeader } from '../table/StickyHeader';
import { EditableCell } from './EditableCell';
import { MergedData, VisibleColumns } from '../../utils/mergeUtils/types';
import { formatDate } from '../../utils/dateUtils';
import { formatNumber } from '../../utils/numberUtils';

interface MergedTableProps {
  data: MergedData;
  visibleColumns: VisibleColumns;
  onUpdateCell: (rowIndex: number, colIndex: number, value: number | null) => void;
}

export function MergedTable({ data, visibleColumns, onUpdateCell }: MergedTableProps) {
  const { headers, rows, duplicates } = data;

  const visibleHeaders = useMemo(() => 
    headers.filter((_, index) => visibleColumns[index]),
    [headers, visibleColumns]
  );

  const visibleIndices = useMemo(() => 
    headers.map((_, index) => index).filter(index => visibleColumns[index]),
    [headers, visibleColumns]
  );

  const formatCellValue = (value: any, columnIndex: number, rowIndex: number): React.ReactNode => {
    if (value === null || value === undefined) return '-';

    // Format first column as date
    if (columnIndex === 0) {
      return formatDate(value);
    }

    // Make columns 5, 6, and 7 editable (price, count, total)
    const totalColumns = headers.length;
    if (columnIndex === totalColumns - 3 || 
        columnIndex === totalColumns - 2 || 
        columnIndex === totalColumns - 1) {
      return (
        <EditableCell
          value={typeof value === 'number' ? value : null}
          onChange={(newValue) => onUpdateCell(rowIndex, columnIndex, newValue)}
        />
      );
    }

    // Format numeric values
    if (typeof value === 'number') {
      return formatNumber(value);
    }

    return String(value);
  };

  const isDuplicate = (rowIndex: number): boolean => {
    for (const indices of duplicates.values()) {
      if (indices.includes(rowIndex) && indices[0] !== rowIndex) {
        return true;
      }
    }
    return false;
  };

  return (
    <TableContainer>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <StickyHeader>
            {visibleHeaders.map((header, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium tracking-wider ${
                  index >= visibleHeaders.length - 3
                    ? 'text-blue-600 uppercase'
                    : 'text-gray-500 uppercase'
                }`}
              >
                {header}
              </th>
            ))}
          </StickyHeader>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  isDuplicate(rowIndex) ? 'bg-yellow-50' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                {visibleIndices.map((colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {formatCellValue(row[colIndex], colIndex, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableContainer>
  );
}