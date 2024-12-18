import React, { useState, useMemo } from 'react';
import { TableProperties } from 'lucide-react';
import { ExcelData, ColumnSelection } from '../../types/excel';
import { mergeTables } from '../../utils/mergeUtils';
import { filterMergedData } from '../../utils/mergeUtils/filterUtils';
import { FilterOptions, VisibleColumns } from '../../utils/mergeUtils/types';
import { initializeVisibleColumns, toggleColumnVisibility } from '../../utils/mergeUtils/columnUtils';
import { MergedTable } from './MergedTable';
import { MergedTableFilters } from './MergedTableFilters';
import { ColumnVisibilityControls } from './ColumnVisibilityControls';
import { ExportButton } from './ExportButton';

interface MergedTableSectionProps {
  firstData: ExcelData | null;
  secondData: ExcelData | null;
  firstColumns: ColumnSelection[];
  secondColumns: ColumnSelection[];
}

export function MergedTableSection({
  firstData,
  secondData,
  firstColumns,
  secondColumns
}: MergedTableSectionProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    removeDuplicates: false,
    removeEmpty: false,
    removeNulls: false,
    searchTerm: ''
  });

  const mergedData = useMemo(() => 
    mergeTables(firstData, secondData, firstColumns, secondColumns),
    [firstData, secondData, firstColumns, secondColumns]
  );

  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>(
    mergedData ? initializeVisibleColumns(mergedData.headers.length) : {}
  );

  const filteredData = useMemo(() => {
    if (!mergedData) return null;
    return filterMergedData(mergedData, filterOptions);
  }, [mergedData, filterOptions]);

  const duplicateCount = useMemo(() => 
    mergedData?.duplicates.size ?? 0,
    [mergedData]
  );

  const handleToggleColumn = (index: number) => {
    setVisibleColumns(prev => toggleColumnVisibility(prev, index));
  };

  const handleUpdateCell = (rowIndex: number, colIndex: number, value: number | null) => {
    if (!mergedData) return;

    const newData = {
      ...mergedData,
      rows: mergedData.rows.map((row, i) => {
        if (i !== rowIndex) return row;
        
        const newRow = [...row];
        newRow[colIndex] = value;
        
        // If updating price or count, recalculate total
        const totalIndex = mergedData.headers.length - 1;
        const priceIndex = totalIndex - 2;
        const countIndex = totalIndex - 1;
        
        if (colIndex === priceIndex || colIndex === countIndex) {
          const price = newRow[priceIndex];
          const count = newRow[countIndex];
          if (typeof price === 'number' && typeof count === 'number') {
            newRow[totalIndex] = price * count;
          }
        }
        
        return newRow;
      })
    };

    // Update merged data (you might want to lift this state up if needed)
    Object.assign(mergedData, newData);
  };

  if (!filteredData) {
    return (
      <div className="text-center text-gray-500 mt-4">
        Please upload and select columns from both files to see the merged view
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TableProperties className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-800">Merged View</h2>
        </div>
        <div className="flex items-center gap-4">
          {duplicateCount > 0 && !filterOptions.removeDuplicates && (
            <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              {duplicateCount} duplicate{duplicateCount > 1 ? 's' : ''} found
            </span>
          )}
          <ExportButton
            data={filteredData}
            visibleColumns={visibleColumns}
          />
        </div>
      </div>

      <MergedTableFilters
        options={filterOptions}
        onChange={setFilterOptions}
        duplicateCount={duplicateCount}
      />

      <ColumnVisibilityControls
        headers={filteredData.headers}
        visibleColumns={visibleColumns}
        onToggleColumn={handleToggleColumn}
      />

      <MergedTable 
        data={filteredData}
        visibleColumns={visibleColumns}
        onUpdateCell={handleUpdateCell}
      />
    </div>
  );
}