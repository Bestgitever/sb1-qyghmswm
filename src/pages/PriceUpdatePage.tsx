import React from 'react';
import { FileSpreadsheet, LogOut } from 'lucide-react';
import { FileUploader } from '../components/FileUploader';
import { SelectedColumnsTable } from '../components/SelectedColumnsTable';
import { ColumnSelector } from '../components/ColumnSelector';
import { MergedTableSection } from '../components/merged/MergedTableSection';
import { LoginForm } from '../components/auth/LoginForm';
import { useExcelData } from '../hooks/useExcelData';
import { useColumnSelection } from '../hooks/useColumnSelection';
import { useAuth } from '../hooks/useAuth';

export function PriceUpdatePage() {
  const { authState, error, login, logout } = useAuth();
  const { excelData: firstExcelData, handleFileUpload: handleFirstFileUpload } = useExcelData();
  const { 
    columnSelections: firstColumnSelections, 
    handleColumnToggle: handleFirstColumnToggle,
    handleColumnUpdate: handleFirstColumnUpdate,
    handleToggleAll: handleFirstToggleAll,
    initializeColumns: initializeFirstColumns
  } = useColumnSelection();

  const { excelData: secondExcelData, handleFileUpload: handleSecondFileUpload } = useExcelData();
  const {
    columnSelections: secondColumnSelections,
    handleColumnToggle: handleSecondColumnToggle,
    handleColumnUpdate: handleSecondColumnUpdate,
    handleToggleAll: handleSecondToggleAll,
    initializeColumns: initializeSecondColumns
  } = useColumnSelection();

  const handleFirstFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = await handleFirstFileUpload(event);
    if (data) {
      initializeFirstColumns(data.headers);
    }
  };

  const handleSecondFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = await handleSecondFileUpload(event);
    if (data) {
      initializeSecondColumns(data.headers);
    }
  };

  if (!authState.isAuthenticated) {
    return <LoginForm onLogin={login} error={error} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Price Update</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Logged in as: {authState.username}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* First Excel File Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">First Excel File</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-4">
          <div>
            <FileUploader onFileUpload={handleFirstFile} label="Upload First Excel File" />
            {firstExcelData && (
              <ColumnSelector
                columns={firstColumnSelections}
                onColumnToggle={handleFirstColumnToggle}
                onToggleAll={handleFirstToggleAll}
              />
            )}
          </div>
          
          <div>
            {firstExcelData && (
              <SelectedColumnsTable
                data={firstExcelData}
                columnSelections={firstColumnSelections}
                onColumnUpdate={handleFirstColumnUpdate}
              />
            )}
          </div>
        </div>
      </div>

      {/* Second Excel File Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">Second Excel File</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-4">
          <div>
            <FileUploader onFileUpload={handleSecondFile} label="Upload Second Excel File" />
            {secondExcelData && (
              <ColumnSelector
                columns={secondColumnSelections}
                onColumnToggle={handleSecondColumnToggle}
                onToggleAll={handleSecondToggleAll}
              />
            )}
          </div>
          
          <div>
            {secondExcelData && (
              <SelectedColumnsTable
                data={secondExcelData}
                columnSelections={secondColumnSelections}
                onColumnUpdate={handleSecondColumnUpdate}
              />
            )}
          </div>
        </div>
      </div>

      {/* Merged Table Section */}
      <MergedTableSection
        firstData={firstExcelData}
        secondData={secondExcelData}
        firstColumns={firstColumnSelections}
        secondColumns={secondColumnSelections}
      />
    </div>
  );
}