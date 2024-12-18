import { useState, useCallback } from 'react';
import { FilterState, getUniqueColumnValues, applyFilters } from '../utils/excel/filters';

export function useTableFilters(initialData: any[][]) {
  const [filters, setFilters] = useState<FilterState>({});
  
  const uniqueValues = useCallback((columnIndex: number) => 
    getUniqueColumnValues(initialData, columnIndex),
    [initialData]
  );

  const handleFilterChange = useCallback((columnIndex: number, selectedValues: Set<any>) => {
    setFilters(prev => ({
      ...prev,
      [columnIndex]: selectedValues
    }));
  }, []);

  const filterData = useCallback((data: any[][]) => 
    applyFilters(data, filters),
    [filters]
  );

  return {
    filters,
    uniqueValues,
    handleFilterChange,
    filterData
  };
}