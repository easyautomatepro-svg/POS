import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  ShoppingBag, 
  RotateCcw, 
  Receipt, 
  FileText, 
  Settings,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { hasPermission } = useAuth();

  const menuItems = [
    {
      id: 'sales',
      label: 'Sales',
      icon: ShoppingCart,
      permission: 'sales.read',
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Package,
      permission: 'inventory.read',
    },
    {
      id: 'purchases',
      label: 'Purchases',
      icon: ShoppingBag,
      permission: 'purchases.read',
    },
    {
      id: 'returns',
      label: 'Returns',
      icon: RotateCcw,
      permission: 'returns.read',
    },
    {
      id: 'expenses',
      label: 'Expenses',
      icon: Receipt,
      permission: 'expenses.read',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      permission: 'reports.read',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      permission: 'settings.read',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      permission: 'dashboard.read',
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    hasPermission(item.permission) || hasPermission('*')
  );

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;