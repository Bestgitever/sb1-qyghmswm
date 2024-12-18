import React from 'react';
import { ColumnFilter } from './ColumnFilter';

interface TableHeaderProps {
  header: string;
  index: number;
  isFilterable: boolean;
  values?: Set<any>;
  selectedValues?: Set<any>;
  onFilterChange?: (columnIndex: number, values: Set<any>) => void;
}

export function TableHeader({
  header,
  index,
  isFilterable,
  values,
  selectedValues,
  onFilterChange
}: TableHeaderProps) {
  return (
    <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate">{header}</span>
        {isFilterable && values && selectedValues && onFilterChange && (
          <div className="flex-shrink-0">
            <ColumnFilter
              columnIndex={index}
              values={values}
              selectedValues={selectedValues}
              onFilterChange={onFilterChange}
            />
          </div>
        )}
      </div>
    </th>
  );
}