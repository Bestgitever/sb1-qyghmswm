import { read, utils } from 'xlsx';
import { ExcelData } from '../types/excel';
import { isValidColumnContent } from './validationUtils';
import { addCalculatedColumns } from './excel/calculations';

export const readExcelFile = async (
  file: File, 
  filterEmptyColumns: boolean = false,
  firstFileData: any[][] | null = null
): Promise<ExcelData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { 
          type: 'array',
          cellDates: false
        });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(firstSheet, { 
          header: 1,
          raw: true
        }) as any[][];

        if (jsonData.length === 0) {
          throw new Error('Excel file is empty');
        }

        let headers = jsonData[0];
        let rows = jsonData.slice(1);

        if (filterEmptyColumns) {
          // Filter out columns with empty or invalid headers
          const validColumnIndices = headers.map((_, index) => index)
            .filter(index => isValidColumnContent(headers[index]));

          // Filter headers and rows to include only valid columns
          headers = validColumnIndices.map(index => headers[index]);
          rows = rows.map(row => 
            validColumnIndices.map(index => row[index] ?? null)
          );

          let processedData: ExcelData = { headers, rows };

          // Add calculated columns with new names
          processedData = {
            headers: [
              ...processedData.headers, 
              '10Nákup/BAL',          // Column 10
              '11BAL',                // Column 11
              '12Prodej/BAL',         // Column 12
              '13Check',              // Column 13
              'Slevy',                // Column 14
              '15Check0',             // Column 15
              '16check1',             // Column 16
              '17check2',             // Column 17
              '18Check3',             // Column 18
              '19Zisk/KS'             // Column 19 (renamed from 19Check4)
            ],
            rows: addCalculatedColumns(processedData.rows, firstFileData)
          };

          resolve(processedData);
        } else {
          resolve({ headers, rows });
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};