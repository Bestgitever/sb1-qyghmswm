import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';
import { MergedData, VisibleColumns } from './mergeUtils/types';
import { formatDate } from './dateUtils';
import { formatNumber } from './numberUtils';

export const exportToExcel = (
  data: MergedData,
  visibleColumns: VisibleColumns,
  filename: string = 'exported-data.xlsx'
) => {
  try {
    // Filter visible columns and their data
    const visibleHeaders = data.headers.filter((_, index) => visibleColumns[index]);
    const visibleIndices = data.headers
      .map((_, index) => index)
      .filter(index => visibleColumns[index]);

    // Format the data for export
    const exportData = data.rows.map(row => {
      const rowData: Record<string, any> = {};
      visibleIndices.forEach((colIndex, i) => {
        const value = row[colIndex];
        const header = visibleHeaders[i];
        
        // Format based on column type
        if (colIndex === 0) {
          rowData[header] = formatDate(value);
        } else if (typeof value === 'number') {
          rowData[header] = value; // Keep numbers as numbers for Excel
        } else {
          rowData[header] = value ?? '';
        }
      });
      return rowData;
    });

    // Create worksheet from data
    const ws = utils.json_to_sheet(exportData, {
      header: visibleHeaders
    });

    // Set column widths
    const colWidths = visibleHeaders.map(header => ({
      wch: Math.max(header.length, 15)
    }));
    ws['!cols'] = colWidths;

    // Create workbook and append worksheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Exported Data');

    // Write file and trigger download
    writeFile(wb, filename, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'array'
    });

  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('An error occurred while exporting the data. Please try again.');
  }
}