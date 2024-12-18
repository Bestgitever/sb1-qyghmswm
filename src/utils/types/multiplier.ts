export interface MultiplierRule {
  triggerValue: number;
  multiplier: number;
}

export interface MultiplierGroup {
  values: number[];
  multiplier: number;
  description: string;
}