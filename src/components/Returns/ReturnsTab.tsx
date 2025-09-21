import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';

const ReturnsTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'create' | 'history'>('create');
  const [searchSKU, setSearchSKU] = useState('');
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [returnItems, setReturnItems] = useState<any[]>([]);
  const [returnReason, setReturnReason] = useState('');

  // Demo sales data
  const demoSales = [
    {
      id: '1',
      invoiceNo: 'INV-001',
      date: '2024-01-15',
      customer: 'Ahmad Ali',
      items: [
        { id: '1', sku: 'LP001', productName: 'Laptop HP Pavilion', quantity: 1, price: 55000, total: 55000 },
        { id: '2', sku: 'MS001', productName: 'Mouse Logitech', quantity: 1, price: 2000, total: 2000 },
      ],
      total: 57000,
    },
    {
      id: '2',
      invoiceNo: 'INV-002',
      date: '2024-01-14',
      customer: 'Fatima Khan',
      items: [
        { id: '3', sku: 'KB001', productName: 'Keyboard Mechanical', quantity: 1, price: 4000, total: 4000 },
      ],
      total: 4000,
    },
  ];

  const searchSaleByInvoice = () => {
    const sale = demoSales.find(s => 
      s.invoiceNo.toLowerCase().includes(searchSKU.toLowerCase()) ||
      s.items.some(item => item.sku.toLowerCase().includes(searchSKU.toLowerCase()))
    );
    
    if (sale) {
      setSelectedSale(sale);
      setReturnItems(sale.items.map(item => ({ ...item, returnQuantity: 0, selected: false })));
    } else {
      setSelectedSale(null);
      setReturnItems([]);
    }
  };

  const updateReturnItem = (itemId: string, field: string, value: any) => {
    setReturnItems(returnItems.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ));
  };

  const selectedReturnItems = returnItems.filter(item => item.selected && item.returnQuantity > 0);
  const returnTotal = selectedReturnItems.reduce((sum, item) => 
    sum + (item.price * item.returnQuantity), 0
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Returns Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'create'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Process Return
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Return History
          </button>
        </div>
      </div>

      {activeView === 'create' && (
        <div className="space-y-6">
          {/* Search Sale */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Sale for Return</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchSKU}
                onChange={(e) => setSearchSKU(e.target.value)}
                placeholder="Enter Invoice No. or SKU"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={searchSaleByInvoice}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Sale Details */}
          {selectedSale && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sale Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Invoice No.</label>
                  <p className="text-gray-900 font-medium">{selectedSale.invoiceNo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900">{selectedSale.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <p className="text-gray-900">{selectedSale.customer}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Select</th>
                      <th className="text-left py-2">SKU</th>
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2">Sold Qty</th>
                      <th className="text-left py-2">Return Qty</th>
                      <th className="text-left py-2">Price</th>
                      <th className="text-left py-2">Return Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) => updateReturnItem(item.id, 'selected', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 font-mono">{item.sku}</td>
                        <td className="py-2">{item.productName}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">
                          <input
                            type="number"
                            value={item.returnQuantity}
                            onChange={(e) => updateReturnItem(item.id, 'returnQuantity', parseInt(e.target.value) || 0)}
                            max={item.quantity}
                            min="0"
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            disabled={!item.selected}
                          />
                        </td>
                        <td className="py-2">Rs. {item.price.toLocaleString()}</td>
                        <td className="py-2 font-medium">
                          Rs. {(item.price * (item.returnQuantity || 0)).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Return Details */}
          {selectedSale && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Reason</label>
                  <textarea
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reason for return..."
                  />
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-lg font-semibold">Total Return Amount:</span>
                  <span className="text-xl font-bold text-red-600">Rs. {returnTotal.toLocaleString()}</span>
                </div>

                <button
                  disabled={selectedReturnItems.length === 0 || !returnReason.trim()}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Process Return</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Return History</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search returns..."
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
                  <th className="text-left py-3 px-4">Return Date</th>
                  <th className="text-left py-3 px-4">Original Invoice</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Items Returned</th>
                  <th className="text-left py-3 px-4">Return Amount</th>
                  <th className="text-left py-3 px-4">Reason</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">2024-01-16</td>
                  <td className="py-3 px-4">INV-001</td>
                  <td className="py-3 px-4">Ahmad Ali</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Rs. 2,000</td>
                  <td className="py-3 px-4">Defective</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Processed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnsTab;