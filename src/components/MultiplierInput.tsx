import React, { useState } from 'react';
import { MultiplierGroup } from '../utils/multiplierRules/types';
import { formatNumber } from '../utils/numberUtils';

interface MultiplierInputProps {
  groups: MultiplierGroup[];
  onMultiplierChange: (groupId: string, newMultiplier: number) => void;
}

export function MultiplierInput({ groups, onMultiplierChange }: MultiplierInputProps) {
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const handleEdit = (groupId: string, currentMultiplier: number) => {
    setEditingGroup(groupId);
    setTempValue(currentMultiplier.toString());
  };

  const handleSave = (groupId: string) => {
    const newValue = parseFloat(tempValue);
    if (!isNaN(newValue)) {
      onMultiplierChange(groupId, newValue);
    }
    setEditingGroup(null);
    setTempValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, groupId: string) => {
    if (e.key === 'Enter') {
      handleSave(groupId);
    } else if (e.key === 'Escape') {
      setEditingGroup(null);
      setTempValue('');
    }
  };

  return (
    <div className="mb-3 space-y-2">
      <div className="text-xs text-gray-500">
        <p className="font-medium mb-2">Multiplier Rules:</p>
        <p className="text-xs text-gray-400 mb-2">
          The fourth selected column's values will be multiplied by these numbers when the third column matches the specified values
        </p>
        <div className="space-y-2">
          {groups.map((group) => (
            <div key={group.id} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded">
              <div className="flex-1">
                <span className="text-gray-600">
                  {group.label}
                </span>
              </div>
              {editingGroup === group.id ? (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">×</span>
                  <input
                    type="number"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, group.id)}
                    onBlur={() => handleSave(group.id)}
                    className="w-20 px-2 py-1 text-xs border rounded"
                    step="0.01"
                    autoFocus
                  />
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(group.id, group.multiplier)}
                  className="flex items-center gap-1 hover:text-blue-600"
                  type="button"
                >
                  <span className="text-gray-400">×</span>
                  <span className="font-medium">{formatNumber(group.multiplier)}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}