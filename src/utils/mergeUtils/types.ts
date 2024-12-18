export interface MergedData {
  headers: string[];
  rows: any[][];
  duplicates: Map<string, number[]>;
}

export interface MergeOptions {
  keyColumnIndex?: number;
  keepDuplicates?: boolean;
}

export interface FilterOptions {
  removeDuplicates: boolean;
  removeEmpty: boolean;
  removeNulls: boolean;
  searchTerm: string;
}

export interface VisibleColumns {
  [key: number]: boolean;
}

export interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
  dateFormat?: string;
  numberFormat?: string;
}