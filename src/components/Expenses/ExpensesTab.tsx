import React, { useState } from 'react';
import { Plus, Search, Calendar, Receipt } from 'lucide-react';
import { Expense } from '../../types';

const ExpensesTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'add' | 'history'>('add');
  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: 0,
  });

  // Demo expense categories
  const expenseCategories = [
    'Office Rent',
    'Utilities',
    'Salaries',
    'Marketing',
    'Transportation',
    'Office Supplies',
    'Maintenance',
    'Insurance',
    'Professional Services',
    'Other',
  ];

  // Demo expenses data
  const demoExpenses: Expense[] = [
    {
      id: '1',
      date: '2024-01-15',
      category: 'Office Rent',
      description: 'Monthly office rent payment',
      amount: 25000,
      userId: '1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      date: '2024-01-14',
      category: 'Utilities',
      description: 'Electricity bill',
      amount: 8000,
      userId: '1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      date: '2024-01-13',
      category: 'Transportation',
      description: 'Fuel for delivery vehicle',
      amount: 5000,
      userId: '1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      date: '2024-01-12',
      category: 'Office Supplies',
      description: 'Stationery and printing materials',
      amount: 3500,
      userId: '1',
      createdAt: new Date().toISOString(),
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setExpenseForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle expense submission
    console.log('Expense submitted:', expenseForm);
    // Reset form
    setExpenseForm({
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
      amount: 0,
    });
  };

  const totalExpenses = demoExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = demoExpenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('add')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add Expense
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Expense History
          </button>
        </div>
      </div>

      {/* Expense Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600 mt-1">Rs. {totalExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Receipt className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">Rs. {monthlyExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Daily</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">Rs. {Math.round(monthlyExpenses / new Date().getDate()).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {activeView === 'add' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Expense</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={expenseForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter expense description..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (Rs.)</label>
              <input
                type="number"
                value={expenseForm.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setExpenseForm({
                  date: new Date().toISOString().split('T')[0],
                  category: '',
                  description: '',
                  amount: 0,
                })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      )}

      {activeView === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Expense History</h3>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                {expenseCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search expenses..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{expense.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{expense.description}</td>
                    <td className="py-3 px-4 font-semibold text-red-600">Rs. {expense.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Category-wise Summary */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Category-wise Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expenseCategories.slice(0, 6).map(category => {
                const categoryExpenses = demoExpenses.filter(e => e.category === category);
                const categoryTotal = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
                
                if (categoryTotal === 0) return null;
                
                return (
                  <div key={category} className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900">{category}</h5>
                    <p className="text-lg font-bold text-red-600">Rs. {categoryTotal.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{categoryExpenses.length} transactions</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesTab;