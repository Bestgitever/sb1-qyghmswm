import React, { useState, useEffect, useRef } from 'react';
import { Filter, Search, Check } from 'lucide-react';

interface ColumnFilterProps {
  columnIndex: number;
  values: Set<any>;
  selectedValues: Set<any>;
  onFilterChange: (columnIndex: number, values: Set<any>) => void;
}

export function ColumnFilter({ 
  columnIndex, 
  values, 
  selectedValues, 
  onFilterChange 
}: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredValues = Array.from(values).filter(value =>
    String(value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleValue = (value: any) => {
    const newSelected = new Set(selectedValues);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    onFilterChange(columnIndex, newSelected);
  };

  const handleSelectAll = () => {
    onFilterChange(columnIndex, new Set(values));
  };

  const handleDeselectAll = () => {
    onFilterChange(columnIndex, new Set());
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1.5 rounded-md transition-colors ${
          selectedValues.size !== values.size 
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
            : 'text-gray-400 hover:bg-gray-100'
        }`}
        title="Filter column"
      >
        <Filter className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          ref={filterRef}
          className="fixed z-[100] bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            width: '256px', // w-64 equivalent
            maxHeight: 'calc(100vh - 200px)',
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
            left: buttonRef.current ? 
              Math.min(
                buttonRef.current.getBoundingClientRect().left,
                window.innerWidth - 256 - 16
              ) : 0,
          }}
        >
          <div className="p-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search values..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2" />
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
                <label
                  key={index}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => handleToggleValue(value)}
                >
                  <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                    selectedValues.has(value) 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedValues.has(value) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700 truncate">
                    {String(value)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}