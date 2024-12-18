import { MultiplierMap, MultiplierGroup } from './types';
import { MULTIPLIER_GROUPS } from './constants';

export function createMultiplierMap(): MultiplierMap {
  const multiplierMap = new Map<number, number>();
  
  MULTIPLIER_GROUPS.forEach(group => {
    group.values.forEach(value => {
      multiplierMap.set(value, group.multiplier);
    });
  });
  
  return multiplierMap;
}

export function getMultiplierForValue(value: number): number | null {
  const multiplierMap = createMultiplierMap();
  return multiplierMap.get(value) ?? null;
}

export function getMultiplierGroups(): MultiplierGroup[] {
  return MULTIPLIER_GROUPS;
}