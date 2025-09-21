import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, TrendingDown } from 'lucide-react';

const ReportsTab: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'profit-loss' | 'inventory' | 'sales' | 'expenses'>('profit-loss');
  const [dateRange, setDateRange] = useState({
    from: '2024-01-01',
    to: new Date().toISOString().split('T')[0],
  });

  // Demo data for reports
  const profitLossData = {
    revenue: 2450000,
    cogs: 1800000,
    grossProfit: 650000,
    expenses: 150000,
    netProfit: 500000,
    grossMargin: 26.5,
    netMargin: 20.4,
  };

  const salesData = [
    { month: 'Jan 2024', sales: 2450000, transactions: 156, avgSale: 15705 },
    { month: 'Dec 2023', sales: 2200000, transactions: 142, avgSale: 15493 },
    { month: 'Nov 2023', sales: 2100000, transactions: 138, avgSale: 15217 },
  ];

  const topProducts = [
    { name: 'Laptop HP Pavilion', sold: 15, revenue: 825000, profit: 150000 },
    { name: 'Mouse Logitech', sold: 45, revenue: 90000, profit: 22500 },
    { name: 'Keyboard Mechanical', sold: 12, revenue: 48000, profit: 12000 },
  ];

  const inventoryData = [
    { product: 'Laptop HP Pavilion', stock: 10, value: 550000, turnover: 1.5 },
    { product: 'Mouse Logitech', stock: 25, value: 50000, turnover: 1.8 },
    { product: 'Keyboard Mechanical', stock: 3, value: 12000, turnover: 4.0 },
  ];

  const expenseData = [
    { category: 'Office Rent', amount: 25000, percentage: 16.7 },
    { category: 'Utilities', amount: 8000, percentage: 5.3 },
    { category: 'Transportation', amount: 5000, percentage: 3.3 },
    { category: 'Office Supplies', amount: 3500, percentage: 2.3 },
  ];

  const ReportCard: React.FC<{
    title: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative';
    icon: React.ReactNode;
  }> = ({ title, value, change, changeType, icon }) => (
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
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="flex space-x-2 mb-6">
        {[
          { id: 'profit-loss', label: 'Profit & Loss' },
          { id: 'sales', label: 'Sales Report' },
          { id: 'inventory', label: 'Inventory Report' },
          { id: 'expenses', label: 'Expense Report' },
        ].map((report) => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeReport === report.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {report.label}
          </button>
        ))}
      </div>

      {/* Profit & Loss Report */}
      {activeReport === 'profit-loss' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReportCard
              title="Total Revenue"
              value={`Rs. ${profitLossData.revenue.toLocaleString()}`}
              change="+12.5%"
              changeType="positive"
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <ReportCard
              title="Cost of Goods Sold"
              value={`Rs. ${profitLossData.cogs.toLocaleString()}`}
              change="+8.2%"
              changeType="negative"
              icon={<TrendingDown className="h-6 w-6" />}
            />
            <ReportCard
              title="Gross Profit"
              value={`Rs. ${profitLossData.grossProfit.toLocaleString()}`}
              change="+15.8%"
              changeType="positive"
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <ReportCard
              title="Net Profit"
              value={`Rs. ${profitLossData.netProfit.toLocaleString()}`}
              change="+18.3%"
              changeType="positive"
              icon={<TrendingUp className="h-6 w-6" />}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit & Loss Statement</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Revenue</span>
                <span className="font-semibold text-green-600">Rs. {profitLossData.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Cost of Goods Sold</span>
                <span className="font-semibold text-red-600">Rs. {profitLossData.cogs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Gross Profit</span>
                <span className="font-semibold">Rs. {profitLossData.grossProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Operating Expenses</span>
                <span className="font-semibold text-red-600">Rs. {profitLossData.expenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t-2 border-gray-300">
                <span className="font-bold text-lg">Net Profit</span>
                <span className="font-bold text-lg text-green-600">Rs. {profitLossData.netProfit.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900">Gross Margin</h4>
                <p className="text-2xl font-bold text-blue-600">{profitLossData.grossMargin}%</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900">Net Margin</h4>
                <p className="text-2xl font-bold text-green-600">{profitLossData.netMargin}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales Report */}
      {activeReport === 'sales' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">Period</th>
                    <th className="text-left py-3 px-4">Sales</th>
                    <th className="text-left py-3 px-4">Transactions</th>
                    <th className="text-left py-3 px-4">Avg Sale</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((data, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{data.month}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">Rs. {data.sales.toLocaleString()}</td>
                      <td className="py-3 px-4">{data.transactions}</td>
                      <td className="py-3 px-4">Rs. {data.avgSale.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Units Sold</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                    <th className="text-left py-3 px-4">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4">{product.sold}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">Rs. {product.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">Rs. {product.profit.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Report */}
      {activeReport === 'inventory' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Current Stock</th>
                  <th className="text-left py-3 px-4">Stock Value</th>
                  <th className="text-left py-3 px-4">Turnover Rate</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.product}</td>
                    <td className="py-3 px-4">{item.stock}</td>
                    <td className="py-3 px-4 font-semibold">Rs. {item.value.toLocaleString()}</td>
                    <td className="py-3 px-4">{item.turnover}x</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.stock <= 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.stock <= 5 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expense Report */}
      {activeReport === 'expenses' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Percentage</th>
                  <th className="text-left py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {expenseData.map((expense, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{expense.category}</td>
                    <td className="py-3 px-4 font-semibold text-red-600">Rs. {expense.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">{expense.percentage}%</td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 flex items-center">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        -2.3%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTab;