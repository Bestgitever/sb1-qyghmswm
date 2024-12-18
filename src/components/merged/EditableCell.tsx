import React, { useState, useRef, useEffect } from 'react';
import { formatNumber } from '../../utils/numberUtils';

interface EditableCellProps {
  value: number | null;
  onChange: (value: number | null) => void;
  className?: string;
}

export function EditableCell({ value, onChange, className = '' }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value?.toString() || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempValue(value?.toString() || '');
  };

  const handleBlur = () => {
    const parsed = parseFloat(tempValue);
    if (!isNaN(parsed)) {
      onChange(parsed);
    } else if (tempValue === '') {
      onChange(null);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value?.toString() || '');
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        step="any"
      />
    );
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`cursor-pointer hover:bg-gray-50 ${className}`}
      title="Double click to edit"
    >
      {value !== null ? formatNumber(value) : '-'}
    </div>
  );
}