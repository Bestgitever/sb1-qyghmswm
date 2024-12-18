import React from 'react';

interface TableCellProps {
  value: string;
  rowIndex: number;
  colIndex: number;
  isSelected: boolean;
  isSelecting: boolean;
  onMouseDown: () => void;
  onMouseMove: () => void;
  onMouseUp: () => void;
}

export function TableCell({
  value,
  isSelected,
  isSelecting,
  onMouseDown,
  onMouseMove,
  onMouseUp
}: TableCellProps) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 select-none
        ${isSelected ? 'bg-blue-100' : ''}
        ${isSelecting ? 'cursor-pointer' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {value}
    </td>
  );
}