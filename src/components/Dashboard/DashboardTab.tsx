import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  Users,
  Calendar
} from 'lucide-react';

const DashboardTab: React.FC = () => {
  // Demo KPI data
  const kpis = {
    totalSales: 2450000,
    totalPurchases: 1800000,
    totalExpenses: 150000,
    profitLoss: 500000,
    lowStockItems: 3,
    todaySales: 85000,
    monthlyRevenue: 2450000,
    topSellingProducts: [
      { productName: 'Laptop HP Pavilion', quantity: 15, revenue: 825000 },
      { productName: 'Mouse Logitech', quantity: 45, revenue: 90000 },
      { productName: 'Keyboard Mechanical', quantity: 12, revenue: 48000 },
    ]
  };

  const recentTransactions = [
    { id: '1', type: 'Sale', amount: 55000, customer: 'Ahmad Ali', date: '2024-01-15', time: '10:30 AM' },
    { id: '2', type: 'Purchase', amount: 45000, supplier: 'Tech Suppliers Ltd', date: '2024-01-15', time: '09:15 AM' },
    { id: '3', type: 'Expense', amount: 5000, description: 'Office Rent', date: '2024-01-14', time: '02:00 PM' },
    { id: '4', type: 'Sale', amount: 30000, customer: 'Fatima Khan', date: '2024-01-14', time: '11:45 AM' },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative';
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, changeType, icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'positive' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value={`Rs. ${kpis.totalSales.toLocaleString()}`}
          change="+12.5% from last month"
          changeType="positive"
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Purchases"
          value={`Rs. ${kpis.totalPurchases.toLocaleString()}`}
          change="+8.2% from last month"
          changeType="positive"
          icon={<ShoppingCart className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Expenses"
          value={`Rs. ${kpis.totalExpenses.toLocaleString()}`}
          change="-3.1% from last month"
          changeType="positive"
          icon={<TrendingDown className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
        <StatCard
          title="Profit & Loss"
          value={`Rs. ${kpis.profitLoss.toLocaleString()}`}
          change="+15.8% from last month"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today's Sales</span>
              <span className="font-semibold text-green-600">Rs. {kpis.todaySales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transactions</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Sale</span>
              <span className="font-semibold">Rs. {Math.round(kpis.todaySales / 24).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <span className="text-sm text-gray-700">Keyboard Mechanical</span>
              <span className="text-sm font-medium text-yellow-700">3 left</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <span className="text-sm text-gray-700">USB Cable</span>
              <span className="text-sm font-medium text-yellow-700">2 left</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <span className="text-sm text-gray-700">Power Adapter</span>
              <span className="text-sm font-medium text-yellow-700">1 left</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="font-semibold">156</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="font-semibold">89</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded">
                <ShoppingCart className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Suppliers</p>
                <p className="font-semibold">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {kpis.topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.productName}</p>
                  <p className="text-sm text-gray-600">{product.quantity} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">Rs. {product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border-l-4 border-l-blue-500 bg-gray-50 rounded-r-lg">
                <div>
                  <p className="font-medium text-gray-900">{transaction.type}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.customer || transaction.supplier || transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date} at {transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'Sale' ? 'text-green-600' : 
                    transaction.type === 'Purchase' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'Sale' ? '+' : '-'}Rs. {transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;