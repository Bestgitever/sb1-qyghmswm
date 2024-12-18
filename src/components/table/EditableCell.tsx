import React, { useState, useRef, useEffect } from 'react';
import { formatCellValue } from '../../utils/excel/formatters';

interface EditableCellProps {
  value: any;
  rowIndex: number;
  columnIndex: number;
  isEditable: boolean;
  onValueChange: (rowIndex: number, columnIndex: number, value: any) => void;
  isSecondFile?: boolean;
  totalColumns?: number;
}

export function EditableCell({
  value,
  rowIndex,
  columnIndex,
  isEditable,
  onValueChange,
  isSecondFile = false,
  totalColumns = 0
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!isEditable) return;
    setIsEditing(true);
    setEditValue(String(value ?? ''));
  };

  const handleBlur = () => {
    if (!isEditing) return;
    
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue)) {
      onValueChange(rowIndex, columnIndex, numValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        step="any"
      />
    );
  }

  const formattedValue = formatCellValue(value, columnIndex, isSecondFile, totalColumns);
  const isCalculatedColumn = isSecondFile && columnIndex === totalColumns - 1;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`px-6 py-4 whitespace-nowrap text-sm ${
        isCalculatedColumn ? 'text-blue-600 font-medium' : 'text-gray-500'
      } ${isEditable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      title={isEditable ? 'Double click to edit' : undefined}
    >
      {formattedValue}
    </div>
  );
}