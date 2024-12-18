import { useState, useCallback } from 'react';
import { ColumnSelection } from '../types/excel';

export function useColumnSelection() {
  const [columnSelections, setColumnSelections] = useState<ColumnSelection[]>([]);

  const initializeColumns = useCallback((headers: string[]) => {
    setColumnSelections(
      headers.map((header, index) => ({
        index,
        label: header,
        selected: false,
        sortDirection: null,
        filters: []
      }))
    );
  }, []);

  const handleColumnToggle = useCallback((index: number) => {
    setColumnSelections(prev =>
      prev.map(col =>
        col.index === index ? { ...col, selected: !col.selected } : col
      )
    );
  }, []);

  const handleToggleAll = useCallback(() => {
    setColumnSelections(prev => {
      const allSelected = prev.every(col => col.selected);
      return prev.map(col => ({ ...col, selected: !allSelected }));
    });
  }, []);

  return {
    columnSelections,
    handleColumnToggle,
    handleToggleAll,
    initializeColumns
  };
}