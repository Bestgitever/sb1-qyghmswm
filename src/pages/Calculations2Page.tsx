import React from 'react';
import { Calculator, LogOut } from 'lucide-react';
import { CalculationsLayout } from '../components/calculations2/layout/CalculationsLayout';
import { CalculationsSidebar } from '../components/calculations2/sidebar/CalculationsSidebar';
import { CalculationsContent } from '../components/calculations2/content/CalculationsContent';
import { LoginForm } from '../components/auth/LoginForm';
import { useCalculations2 } from '../hooks/calculations2/useCalculations2';
import { useAuth } from '../hooks/useAuth';

export function Calculations2Page() {
  const { 
    state,
    handlers
  } = useCalculations2();
  
  const { authState, error, login, logout } = useAuth();

  if (!authState.isAuthenticated) {
    return <LoginForm onLogin={login} error={error} />;
  }

  return (
    <CalculationsLayout
      title="Advanced Column Calculations"
      icon={<Calculator className="w-5 h-5 text-blue-600" />}
      username={authState.username}
      onLogout={logout}
      logoutIcon={<LogOut className="w-4 h-4" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-4">
        <CalculationsSidebar
          excelData={state.excelData}
          columnSelections={state.columnSelections}
          selectedColumns={state.selectedColumns}
          multiplierGroups={state.multiplierGroups}
          totals={state.totals}
          onFileUpload={handlers.handleFileUpload}
          onColumnToggle={handlers.handleColumnToggle}
          onMultiplierChange={handlers.handleMultiplierChange}
          onCalculate={handlers.handleCalculate}
        />
        
        <CalculationsContent
          excelData={state.excelData}
          columnSelections={state.columnSelections}
          onColumnUpdate={handlers.handleColumnUpdate}
        />
      </div>
    </CalculationsLayout>
  );
}