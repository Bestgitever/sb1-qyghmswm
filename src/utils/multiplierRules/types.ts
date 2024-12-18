export interface MultiplierGroup {
  id: string;
  values: number[];
  multiplier: number;
  label: string;
}

export type MultiplierMap = Map<number, number>;

export interface MultiplierState {
  groups: MultiplierGroup[];
  updateMultiplier: (groupId: string, value: number) => void;
}