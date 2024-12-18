import { useState, useCallback } from 'react';

export function useColumnVisibility(totalColumns: number) {
  const [visibleColumns, setVisibleColumns] = useState<Record<number, boolean>>(
    Array(totalColumns)
      .fill(true)
      .reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );

  const toggleColumn = useCallback((index: number) => {
    setVisibleColumns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  const toggleAll = useCallback(() => {
    const allVisible = Object.values(visibleColumns).every(Boolean);
    setVisibleColumns(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: !allVisible
      }), {})
    );
  }, [visibleColumns]);

  return {
    visibleColumns,
    toggleColumn,
    toggleAll
  };
}