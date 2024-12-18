import { useState, useCallback } from 'react';
import { CellRange } from '../types/excel';

interface TableSelection {
  isSelecting: boolean;
  range: CellRange | null;
}

export function useTableSelection(onRangeSelect?: (range: CellRange) => void) {
  const [selection, setSelection] = useState<TableSelection>({
    isSelecting: false,
    range: null,
  });

  const handleMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    setSelection({
      isSelecting: true,
      range: {
        startRow: rowIndex,
        endRow: rowIndex,
        startCol: colIndex,
        endCol: colIndex,
      },
    });
  }, []);

  const handleMouseMove = useCallback((rowIndex: number, colIndex: number) => {
    if (selection.isSelecting && selection.range) {
      setSelection(prev => ({
        ...prev,
        range: {
          ...prev.range!,
          endRow: rowIndex,
          endCol: colIndex,
        },
      }));
    }
  }, [selection.isSelecting]);

  const handleMouseUp = useCallback(() => {
    if (selection.range && onRangeSelect) {
      onRangeSelect(selection.range);
    }
    setSelection(prev => ({ ...prev, isSelecting: false }));
  }, [selection.range, onRangeSelect]);

  return {
    selection,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}