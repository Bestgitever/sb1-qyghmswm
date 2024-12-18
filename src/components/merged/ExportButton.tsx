import React from 'react';
import { Download } from 'lucide-react';
import { MergedData, VisibleColumns } from '../../utils/mergeUtils/types';
import { exportToExcel } from '../../utils/exportUtils';

interface ExportButtonProps {
  data: MergedData;
  visibleColumns: VisibleColumns;
}

export function ExportButton({ data, visibleColumns }: ExportButtonProps) {
  const handleExport = () => {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `exported-data-${timestamp}.xlsx`;
      exportToExcel(data, visibleColumns, filename);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      title="Export visible columns to Excel"
    >
      <Download className="w-4 h-4" />
      Export to Excel
    </button>
  );
}