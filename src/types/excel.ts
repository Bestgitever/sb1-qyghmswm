import { ReactNode } from 'react';

export interface ExcelData {
  headers: string[];
  rows: any[][];
}

export interface ColumnSelection {
  index: number;
  label: string;
  selected: boolean;
  sortDirection: 'asc' | 'desc' | null;
  filters: FilterValue[];
  selectedValues?: Set<any>;
  multiplier?: number; // Add multiplier property
}

export interface FilterValue {
  condition: FilterCondition;
  value1: string;
  value2?: string;
}

export type FilterCondition = 
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'between'
  | 'empty'
  | 'notEmpty'
  | 'in';