import { useState, useCallback } from 'react';
import { MultiplierGroup } from '../utils/multiplierRules/types';
import { DEFAULT_MULTIPLIER_GROUPS } from '../utils/multiplierRules/constants';

export function useMultiplierRules() {
  const [multiplierGroups, setMultiplierGroups] = useState<MultiplierGroup[]>(
    DEFAULT_MULTIPLIER_GROUPS
  );

  const updateMultiplier = useCallback((groupId: string, newMultiplier: number) => {
    setMultiplierGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, multiplier: newMultiplier }
          : group
      )
    );
  }, []);

  const getMultiplierForValue = useCallback((value: number): number | null => {
    const group = multiplierGroups.find(g => g.values.includes(value));
    return group?.multiplier ?? null;
  }, [multiplierGroups]);

  return {
    multiplierGroups,
    updateMultiplier,
    getMultiplierForValue
  };
}