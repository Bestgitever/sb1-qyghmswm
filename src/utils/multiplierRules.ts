import { MultiplierRule, MultiplierGroup } from './types/multiplier';

export const MULTIPLIER_GROUPS: MultiplierGroup[] = [
  {
    values: [10000, 10010, 10100],
    multiplier: 20,
    description: '×20 when second column = 10000/10010/10100'
  },
  {
    values: [10200, 10110],
    multiplier: 10,
    description: '×10 when second column = 10200/10110'
  },
  {
    values: [11000],
    multiplier: 8,
    description: '×8 when second column = 11000'
  },
  {
    values: [12000, 12010],
    multiplier: 5,
    description: '×5 when second column = 12000/12010'
  },
  {
    values: [50010],
    multiplier: 0.25,
    description: '×0.25 when second column = 50010'
  }
];

export function createMultiplierMap(): Map<number, number> {
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