export interface FilterState {
  [columnIndex: number]: Set<any>;
}

export const getUniqueColumnValues = (rows: any[][], columnIndex: number): Set<any> => {
  const values = new Set<any>();
  rows.forEach(row => {
    const value = row[columnIndex];
    if (value !== null && value !== undefined) {
      values.add(value);
    }
  });
  return values;
};

export const applyFilters = (
  rows: any[][],
  filters: FilterState
): any[][] => {
  return rows.filter(row => 
    Object.entries(filters).every(([columnIndex, selectedValues]) => {
      const value = row[Number(columnIndex)];
      return selectedValues.size === 0 || selectedValues.has(value);
    })
  );
};