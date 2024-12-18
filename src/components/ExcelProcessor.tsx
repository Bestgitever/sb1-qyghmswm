import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { ExcelData, SelectedRange, CellRange } from '../types/excel';
import { readExcelFile } from '../utils/excelUtils';
import { calculateRangeTotal } from '../utils/calculations/rangeCalculator';
import { FileUploader } from './FileUploader';
import { RangeSelector } from './RangeSelector';
import { ExcelTable } from './ExcelTable';

interface ExcelProcessorProps {
  title: string;
}

export function ExcelProcessor({ title }: ExcelProcessorProps) {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [selectedRange, setSelectedRange] = useState<SelectedRange>({
    startRow: 0,
    endRow: 0,
    startCol: 0,
    endCol: 0,
  });
  const [total, setTotal] = useState<number | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = await readExcelFile(file);
        setExcelData(data);
        setSelectedRange({
          startRow: 0,
          endRow: data.rows.length - 1,
          startCol: 0,
          endCol: data.headers.length - 1,
        });
      } catch (error) {
        console.error('Error reading Excel file:', error);
        alert('Error reading Excel file. Please make sure it\'s a valid Excel file.');
      }
    }
  };

  const handleCalculate = () => {
    if (excelData) {
      const result = calculateRangeTotal(
        excelData,
        selectedRange.startRow,
        selectedRange.endRow,
        selectedRange.startCol,
        selectedRange.endCol
      );
      setTotal(result);
    }
  };

  const handleRangeSelect = (range: CellRange) => {
    setSelectedRange(range);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <FileSpreadsheet className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      <FileUploader onFileUpload={handleFileUpload} label="Upload Excel File" />

      {excelData && (
        <>
          <RangeSelector
            selectedRange={selectedRange}
            maxRows={excelData.rows.length - 1}
            maxCols={excelData.headers.length - 1}
            onRangeChange={setSelectedRange}
          />

          <div className="space-y-4">
            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Total
            </button>

            {total !== null && (
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
                <span className="text-gray-700 font-medium">Total:</span>
                <span className="text-blue-600 font-semibold">{total.toLocaleString()}</span>
              </div>
            )}
          </div>

          <ExcelTable 
            data={excelData} 
            onRangeSelect={handleRangeSelect}
          />
        </>
      )}
    </div>
  );
}