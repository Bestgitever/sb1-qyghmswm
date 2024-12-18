import React from 'react';
import { ExcelData, ColumnSelection } from '../types/excel';
import { TableContainer } from './table/TableContainer';
import { StickyHeader } from './table/StickyHeader';
import { formatDate } from '../utils/dateUtils';

interface SelectedColumnsTableProps {
  data: ExcelData;
  columnSelections: ColumnSelection[];
}

export function SelectedColumnsTable({ 
  data, 
  columnSelections
}: SelectedColumnsTableProps) {
  const selectedColumns = columnSelections.filter(col => col.selected);

  if (selectedColumns.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No columns selected. Please select columns to view the data.
      </div>
    );
  }

  const selectedIndices = selectedColumns.map(col => col.index);

  return (
    <TableContainer>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <StickyHeader>
            {selectedColumns.map((col) => (
              <th
                key={col.index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </StickyHeader>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {selectedIndices.map((colIndex, i) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {i === 0 ? formatDate(row[colIndex]) : String(row[colIndex])}
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