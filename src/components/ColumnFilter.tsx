import React, { useState, useCallback, useMemo } from 'react';
import { X, Search, Check } from 'lucide-react';
import { ColumnSelection } from '../types/excel';

interface ColumnFilterProps {
  column: ColumnSelection;
  onUpdate: (updatedColumn: ColumnSelection) => void;
  onClose: () => void;
  uniqueValues: Set<any>;
}

export function ColumnFilter({ column, onUpdate, onClose, uniqueValues }: ColumnFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<Set<any>>(
    column.selectedValues || new Set(Array.from(uniqueValues))
  );

  const updateColumnWithFilters = useCallback((newSelectedValues: Set<any>) => {
    const selectedArray = Array.from(newSelectedValues);
    const updatedColumn = {
      ...column,
      selectedValues: newSelectedValues,
      filters: selectedArray.length === 0 
        ? [{ condition: 'in', value1: '' }]
        : selectedArray.length === uniqueValues.size
          ? []
          : [{ condition: 'in', value1: selectedArray.join('|') }]
    };
    onUpdate(updatedColumn);
  }, [column, uniqueValues.size, onUpdate]);

  const toggleValue = useCallback((value: any) => {
    setSelectedValues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }, []);

  const handleValueChange = useCallback((value: any) => {
    const newSet = new Set(selectedValues);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setSelectedValues(newSet);
    updateColumnWithFilters(newSet);
  }, [selectedValues, updateColumnWithFilters]);

  const handleSelectAll = useCallback(() => {
    const allValues = new Set(Array.from(uniqueValues));
    setSelectedValues(allValues);
    updateColumnWithFilters(allValues);
  }, [uniqueValues, updateColumnWithFilters]);

  const handleDeselectAll = useCallback(() => {
    const emptySet = new Set();
    setSelectedValues(emptySet);
    updateColumnWithFilters(emptySet);
  }, [updateColumnWithFilters]);

  const filteredValues = useMemo(() => 
    Array.from(uniqueValues).filter(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [uniqueValues, searchTerm]
  );

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Filter {column.label}</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search values..."
          className="w-full pl-8 pr-3 py-1 text-sm border rounded"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1.5" />
      </div>

      <div className="flex justify-between text-xs">
        <button
          onClick={handleSelectAll}
          className="text-blue-600 hover:text-blue-700"
          type="button"
        >
          Select All
        </button>
        <button
          onClick={handleDeselectAll}
          className="text-blue-600 hover:text-blue-700"
          type="button"
        >
          Deselect All
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto space-y-1">
        {filteredValues.map((value, index) => (
          <FilterItem
            key={index}
            value={value}
            isSelected={selectedValues.has(value)}
            onChange={handleValueChange}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterItemProps {
  value: any;
  isSelected: boolean;
  onChange: (value: any) => void;
}

const FilterItem = React.memo(({ value, isSelected, onChange }: FilterItemProps) => (
  <label className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => onChange(value)}
      className="hidden"
    />
    <div className={`w-4 h-4 border rounded flex items-center justify-center ${
      isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
    }`}>
      {isSelected && <Check className="w-3 h-3 text-white" />}
    </div>
    <span className="text-sm text-gray-700 truncate">{String(value)}</span>
  </label>
));