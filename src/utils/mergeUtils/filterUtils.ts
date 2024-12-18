import { MergedData } from './types';

export interface FilterOptions {
  removeDuplicates: boolean;
  removeEmpty: boolean;
  removeNulls: boolean;
  searchTerm: string;
}

export const filterMergedData = (
  data: MergedData,
  options: FilterOptions
): MergedData => {
  let filteredRows = [...data.rows];
  let newDuplicates = new Map(data.duplicates);

  // Remove duplicates - keep only the first occurrence
  if (options.removeDuplicates) {
    const seen = new Set<string>();
    const duplicateIndices = new Set<number>();
    
    // First, identify all duplicate indices
    Array.from(data.duplicates.entries()).forEach(([key, indices]) => {
      // Keep the first occurrence, mark others as duplicates
      indices.slice(1).forEach(index => duplicateIndices.add(index));
    });

    // Filter out marked duplicate rows
    filteredRows = filteredRows.filter((_, index) => !duplicateIndices.has(index));
    newDuplicates = new Map(); // Clear duplicates as they've been removed
  }

  // Remove rows with empty or null values
  if (options.removeEmpty || options.removeNulls) {
    const initialLength = filteredRows.length;
    filteredRows = filteredRows.filter((row, rowIndex) => {
      const shouldKeep = row.some((cell: any) => {
        if (cell === null) return !options.removeNulls;
        if (cell === '' || cell === undefined) return !options.removeEmpty;
        return true;
      });
      
      // If row is removed, update duplicates map
      if (!shouldKeep) {
        newDuplicates.forEach((indices, key) => {
          const updatedIndices = indices.filter(i => i !== rowIndex);
          if (updatedIndices.length > 1) {
            newDuplicates.set(key, updatedIndices);
          } else {
            newDuplicates.delete(key);
          }
        });
      }
      return shouldKeep;
    });
  }

  // Filter by search term
  if (options.searchTerm) {
    const term = options.searchTerm.toLowerCase();
    const initialLength = filteredRows.length;
    filteredRows = filteredRows.filter((row, rowIndex) => {
      const matches = row.some(cell => 
        cell !== null && 
        cell !== undefined && 
        String(cell).toLowerCase().includes(term)
      );

      // If row is filtered out, update duplicates map
      if (!matches) {
        newDuplicates.forEach((indices, key) => {
          const updatedIndices = indices.filter(i => i !== rowIndex);
          if (updatedIndices.length > 1) {
            newDuplicates.set(key, updatedIndices);
          } else {
            newDuplicates.delete(key);
          }
        });
      }
      return matches;
    });
  }

  return {
    headers: data.headers,
    rows: filteredRows,
    duplicates: newDuplicates
  };
};