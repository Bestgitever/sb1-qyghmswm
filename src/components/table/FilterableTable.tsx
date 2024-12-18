import React, { useMemo, useCallback } from 'react';
import { TableContainer } from './TableContainer';
import { TableHeader } from './TableHeader';
import { ColumnVisibility } from './ColumnVisibility';
import { EditableCell } from './EditableCell';
import { useTableFilters } from '../../hooks/useTableFilters';
import { useColumnVisibility } from '../../hooks/useColumnVisibility';

interface FilterableTableProps {
  headers: string[];
  rows: any[][];
  isSecondFile?: boolean;
  filterableColumns?: number[];
  onDataChange?: (newRows: any[][]) => void;
}

export function FilterableTable({
  headers,
  rows,
  isSecondFile = false,
  filterableColumns = [],
  onDataChange
}: FilterableTableProps) {
  const {
    filters,
    uniqueValues,
    handleFilterChange,
    filterData
  } = useTableFilters(rows);

  const {
    visibleColumns,
    toggleColumn,
    toggleAll
  } = useColumnVisibility(headers.length);

  const filteredRows = useMemo(() => filterData(rows), [filterData, rows]);

  const visibleHeaders = headers.filter((_, index) => visibleColumns[index]);
  const visibleIndices = headers
    .map((_, index) => index)
    .filter(index => visibleColumns[index]);

  const handleCellValueChange = useCallback((rowIndex: number, columnIndex: number, value: any) => {
    if (!onDataChange) return;

    const newRows = rows.map((row, i) => {
      if (i !== rowIndex) return row;
      
      const newRow = [...row];
      newRow[columnIndex] = value;

      // If editing Prodej/BAL (column 12), recalculate Prodej s DPH (column 13)
      if (isSecondFile && columnIndex === headers.length - 4) {
        const bal = newRow[headers.length - 5]; // 11BAL
        if (bal !== null && value !== null) {
          newRow[headers.length - 3] = bal * value; // 13Prodej s DPH = 11BAL * 12Prodej/BAL
          
          // Recalculate 15Marže/KS = 13Prodej s DPH - 10Nákup/BAL
          const nakupBal = newRow[headers.length - 6]; // 10Nákup/BAL
          if (nakupBal !== null) {
            newRow[headers.length - 1] = newRow[headers.length - 3] - nakupBal;
          }
        }
      }

      return newRow;
    });

    onDataChange(newRows);
  }, [onDataChange, rows, headers.length, isSecondFile]);

  const isColumnEditable = useCallback((columnIndex: number): boolean => {
    return isSecondFile && columnIndex === headers.length - 4; // 12Prodej/BAL column
  }, [isSecondFile, headers.length]);

  return (
    <div>
      {isSecondFile && (
        <ColumnVisibility
          headers={headers}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumn}
          onToggleAll={toggleAll}
        />
      )}

      <TableContainer>
        <div className="relative">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {visibleHeaders.map((header, visibleIndex) => {
                    const originalIndex = visibleIndices[visibleIndex];
                    return (
                      <TableHeader
                        key={originalIndex}
                        header={header}
                        index={originalIndex}
                        isFilterable={filterableColumns.includes(originalIndex)}
                        values={filterableColumns.includes(originalIndex) ? uniqueValues(originalIndex) : undefined}
                        selectedValues={filterableColumns.includes(originalIndex) ? (filters[originalIndex] || uniqueValues(originalIndex)) : undefined}
                        onFilterChange={filterableColumns.includes(originalIndex) ? handleFilterChange : undefined}
                      />
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {visibleIndices.map((colIndex) => (
                      <td key={colIndex}>
                        <EditableCell
                          value={row[colIndex]}
                          rowIndex={rowIndex}
                          columnIndex={colIndex}
                          isEditable={isColumnEditable(colIndex)}
                          onValueChange={handleCellValueChange}
                          isSecondFile={isSecondFile}
                          totalColumns={headers.length}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TableContainer>
    </div>
  );
}