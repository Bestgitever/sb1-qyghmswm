import { FilterCondition, FilterValue } from '../types/excel';

const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const compareValues = (value: any, filterValue: string, condition: FilterCondition): boolean => {
  if (value === null || value === undefined) {
    return condition === 'empty';
  }

  const stringValue = String(value).toLowerCase();
  const filterLower = filterValue.toLowerCase();

  switch (condition) {
    case 'equals':
      return isNumeric(value) && isNumeric(filterValue) 
        ? Number(value) === Number(filterValue)
        : stringValue === filterLower;
    case 'notEquals':
      return isNumeric(value) && isNumeric(filterValue)
        ? Number(value) !== Number(filterValue)
        : stringValue !== filterLower;
    case 'contains':
      return stringValue.includes(filterLower);
    case 'notContains':
      return !stringValue.includes(filterLower);
    case 'startsWith':
      return stringValue.startsWith(filterLower);
    case 'endsWith':
      return stringValue.endsWith(filterLower);
    case 'greaterThan':
      return isNumeric(value) && isNumeric(filterValue) && Number(value) > Number(filterValue);
    case 'lessThan':
      return isNumeric(value) && isNumeric(filterValue) && Number(value) < Number(filterValue);
    case 'empty':
      return value === null || value === undefined || String(value).trim() === '';
    case 'notEmpty':
      return value !== null && value !== undefined && String(value).trim() !== '';
    case 'in':
      const allowedValues = filterValue.split('|');
      return allowedValues.some(v => String(value).toLowerCase() === v.toLowerCase());
    default:
      return true;
  }
};

export const applyFilters = (value: any, filters: FilterValue[]): boolean => {
  if (!filters?.length) return true;
  
  return filters.every(filter => {
    if (filter.condition === 'between' && filter.value2) {
      if (!isNumeric(value) || !isNumeric(filter.value1) || !isNumeric(filter.value2)) {
        return false;
      }
      const num = Number(value);
      const min = Number(filter.value1);
      const max = Number(filter.value2);
      return num >= min && num <= max;
    }
    
    return compareValues(value, filter.value1, filter.condition);
  });
};