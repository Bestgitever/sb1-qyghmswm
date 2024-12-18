import { useState } from 'react';
import { ExcelData } from '../types/excel';
import { readExcelFile } from '../utils/excelUtils';
import { validateExcelFile } from '../utils/validationUtils';

export function useExcelData(filterEmptyColumns: boolean = false) {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    firstFileData: any[][] | null = null
  ) => {
    const file = event.target.files?.[0];
    setError(null);

    if (file) {
      try {
        const data = await readExcelFile(file, filterEmptyColumns, firstFileData);
        
        // Validate the Excel file
        const validationError = validateExcelFile(data.headers, data.rows);
        if (validationError) {
          setError(validationError);
          return null;
        }

        setExcelData(data);
        return data;
      } catch (error) {
        const errorMessage = 'Error reading Excel file. Please make sure it\'s a valid Excel file.';
        setError(errorMessage);
        console.error('Excel file error:', error);
        return null;
      }
    }
    return null;
  };

  return {
    excelData,
    error,
    handleFileUpload
  };
}