import React, { useCallback } from 'react';
import { Calculator, LogOut } from 'lucide-react';
import { FileUploader } from '../components/FileUploader';
import { SelectedColumnsTable } from '../components/SelectedColumnsTable';
import { ColumnSelector } from '../components/ColumnSelector';
import { MultiplierInput } from '../components/MultiplierInput';
import { ColumnTotals } from '../components/ColumnTotals';
import { LoginForm } from '../components/auth/LoginForm';
import { useExcelData } from '../hooks/useExcelData';
import { useColumnSelection } from '../hooks/useColumnSelection';
import { useCalculations } from '../hooks/useCalculations';
import { useMultiplierRules } from '../hooks/useMultiplierRules';
import { useAuth } from '../hooks/useAuth';

export function CalculationsPage() {
  const { excelData, handleFileUpload } = useExcelData();
  const { columnSelections, handleColumnToggle, handleColumnUpdate, initializeColumns } = useColumnSelection();
  const { totals, calculateColumnTotal, resetTotals } = useCalculations();
  const { multiplierGroups, updateMultiplier, getMultiplierForValue } = useMultiplierRules();
  const { authState, error, login, logout } = useAuth();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = await handleFileUpload(event);
    if (data) {
      initializeColumns(data.headers);
      resetTotals();
    }
  };

  const handleCalculateAll = useCallback(() => {
    if (excelData) {
      const selectedColumns = columnSelections.filter(col => col.selected);
      if (selectedColumns.length >= 4) {
        calculateColumnTotal(excelData, selectedColumns, getMultiplierForValue);
      } else {
        calculateColumnTotal(excelData, selectedColumns);
      }
    }
  }, [excelData, columnSelections, calculateColumnTotal, getMultiplierForValue]);

  const selectedColumns = columnSelections.filter(col => col.selected);
  const showMultipliers = selectedColumns.length >= 4;

  if (!authState.isAuthenticated) {
    return <LoginForm onLogin={login} error={error} />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Column Calculations</h2>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-4">
          <div>
            <FileUploader onFileUpload={handleFile} label="Upload Excel File" />
            {excelData && (
              <div className="space-y-4">
                <ColumnSelector
                  columns={columnSelections}
                  onColumnToggle={handleColumnToggle}
                  onToggleAll={() => {}}
                />
                {selectedColumns.length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Column Totals</h3>
                    {showMultipliers && (
                      <MultiplierInput
                        groups={multiplierGroups}
                        onMultiplierChange={updateMultiplier}
                      />
                    )}
                    <button
                      onClick={handleCalculateAll}
                      className="w-full mb-3 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      disabled={selectedColumns.length < 4}
                    >
                      Calculate All Totals
                    </button>
                    {selectedColumns.length < 4 ? (
                      <div className="text-sm text-gray-500 italic">
                        Select at least 4 columns to calculate totals
                      </div>
                    ) : (
                      <ColumnTotals
                        selectedColumns={selectedColumns}
                        totals={totals}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            {excelData && (
              <SelectedColumnsTable
                data={excelData}
                columnSelections={columnSelections}
                onColumnUpdate={handleColumnUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}