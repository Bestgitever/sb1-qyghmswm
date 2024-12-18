import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { ColumnSelection } from '../types/excel';
import { ColumnFilter } from './ColumnFilter';

interface TableHeaderProps {
  header: string;
  index: number;
  column: ColumnSelection;
  onColumnUpdate: (updatedColumn: ColumnSelection) => void;
  uniqueValues: Set<any>;
}

export function TableHeader({
  header,
  index,
  column,
  onColumnUpdate,
  uniqueValues,
}: TableHeaderProps) {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilter(!showFilter);
  };

  const handleSort = () => {
    const directions: Record<string, 'asc' | 'desc' | null> = {
      'asc': 'desc',
      'desc': null,
      'null': 'asc'
    };
    onColumnUpdate({
      ...column,
      sortDirection: directions[String(column.sortDirection)]
    });
  };

  return (
    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 relative">
      <div className="flex items-center justify-between gap-2 p-2">
        <button 
          onClick={handleSort}
          className="flex items-center gap-1 hover:text-gray-700 group"
        >
          <span className="truncate">{header}</span>
          <div className="flex flex-col -space-y-1">
            <ArrowUp 
              className={`w-3 h-3 flex-shrink-0 transition-colors ${
                column.sortDirection === 'asc' 
                  ? 'text-blue-600' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} 
            />
            <ArrowDown 
              className={`w-3 h-3 flex-shrink-0 transition-colors ${
                column.sortDirection === 'desc' 
                  ? 'text-blue-600' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} 
            />
          </div>
          <span className="ml-1 text-[10px] text-gray-500">
            {column.sortDirection === 'asc' && '(ASC)'}
            {column.sortDirection === 'desc' && '(DESC)'}
          </span>
        </button>
        
        <button
          onClick={handleFilterClick}
          className={`p-1 rounded hover:bg-gray-200 ${
            column.filters?.length ? 'text-blue-600' : 'text-gray-400'
          }`}
          title="Filter"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {showFilter && (
        <div ref={filterRef} className="absolute z-30 top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200">
          <ColumnFilter
            column={column}
            onUpdate={onColumnUpdate}
            onClose={() => setShowFilter(false)}
            uniqueValues={uniqueValues}
          />
        </div>
      )}
    </th>
  );
}