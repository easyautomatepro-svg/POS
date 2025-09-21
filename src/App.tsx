import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import SalesTab from './components/Sales/SalesTab';
import InventoryTab from './components/Inventory/InventoryTab';
import PurchasesTab from './components/Purchases/PurchasesTab';
import ReturnsTab from './components/Returns/ReturnsTab';
import ExpensesTab from './components/Expenses/ExpensesTab';
import ReportsTab from './components/Reports/ReportsTab';
import SettingsTab from './components/Settings/SettingsTab';
import DashboardTab from './components/Dashboard/DashboardTab';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('sales');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'sales':
        return <SalesTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'purchases':
        return <PurchasesTab />;
      case 'returns':
        return <ReturnsTab />;
      case 'expenses':
        return <ExpensesTab />;
      case 'reports':
        return <ReportsTab />;
      case 'settings':
        return <SettingsTab />;
      case 'dashboard':
        return <DashboardTab />;
      default:
        return <SalesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-x-hidden">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;