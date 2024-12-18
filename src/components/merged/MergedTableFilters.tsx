import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterOptions } from '../../utils/mergeUtils/types';

interface MergedTableFiltersProps {
  options: FilterOptions;
  onChange: (options: FilterOptions) => void;
  duplicateCount: number;
}

export function MergedTableFilters({
  options,
  onChange,
  duplicateCount
}: MergedTableFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, searchTerm: e.target.value });
  };

  const handleCheckboxChange = (key: keyof Omit<FilterOptions, 'searchTerm'>) => {
    onChange({ ...options, [key]: !options[key as keyof FilterOptions] });
  };

  return (
    <div className="mb-4 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search in table..."
          value={options.searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Filters:</span>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.removeDuplicates}
            onChange={() => handleCheckboxChange('removeDuplicates')}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            Remove duplicates {duplicateCount > 0 && `(${duplicateCount})`}
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.removeEmpty}
            onChange={() => handleCheckboxChange('removeEmpty')}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Remove empty values</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.removeNulls}
            onChange={() => handleCheckboxChange('removeNulls')}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Remove null values</span>
        </label>
      </div>
    </div>
  );
}