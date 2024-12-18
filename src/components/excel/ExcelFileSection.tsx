import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { ExcelFileUpload } from './ExcelFileUpload';
import { FilterableTable } from '../table/FilterableTable';
import { ExcelData } from '../../types/excel';

interface ExcelFileSectionProps {
  title: string;
  iconColor: string;
  data: ExcelData | null;
  error: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSecondFile?: boolean;
  filterableColumns?: number[];
  uploadDescription?: string;
}

export function ExcelFileSection({
  title,
  iconColor,
  data,
  error,
  onUpload,
  isSecondFile = false,
  filterableColumns = [],
  uploadDescription
}: ExcelFileSectionProps) {
  const [tableData, setTableData] = useState<ExcelData | null>(data);

  // Update table data when new data is received
  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleDataChange = (newRows: any[][]) => {
    if (!tableData) return;
    setTableData({
      headers: tableData.headers,
      rows: newRows
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileSpreadsheet className={`w-5 h-5 ${iconColor}`} />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      <ExcelFileUpload
        title={`Upload ${title}`}
        onUpload={onUpload}
        error={error}
        description={uploadDescription}
      />

      {tableData && (
        <FilterableTable
          headers={tableData.headers}
          rows={tableData.rows}
          isSecondFile={isSecondFile}
          filterableColumns={filterableColumns}
          onDataChange={handleDataChange}
        />
      )}
    </div>
  );
}