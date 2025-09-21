import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import { Purchase, PurchaseItem, Product, Supplier } from '../../types';

const PurchasesTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'create' | 'history'>('create');
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // Demo data
  const demoProducts: Product[] = [
    { id: '1', name: 'Laptop HP Pavilion', category: 'Laptops', sku: 'LP001', purchasePrice: 45000, salePrice: 55000, stock: 10, lowStockThreshold: 5, supplierId: '1', createdAt: new Date().toISOString() },
    { id: '2', name: 'Mouse Logitech', category: 'Accessories', sku: 'MS001', purchasePrice: 1500, salePrice: 2000, stock: 25, lowStockThreshold: 10, supplierId: '1', createdAt: new Date().toISOString() },
  ];

  const demoSuppliers: Supplier[] = [
    { id: '1', name: 'Tech Suppliers Ltd', contact: '03001234567', email: 'tech@suppliers.com', address: 'Lahore', createdAt: new Date().toISOString() },
    { id: '2', name: 'Computer World', contact: '03007654321', email: 'info@computerworld.com', address: 'Karachi', createdAt: new Date().toISOString() },
  ];

  const addNewItem = () => {
    const newItem: PurchaseItem = {
      id: Date.now().toString(),
      productId: '',
      sku: '',
      productName: '',
      quantity: 1,
      purchasePrice: 0,
      salePrice: 0,
      total: 0,
    };
    setPurchaseItems([...purchaseItems, newItem]);
  };

  const removeItem = (id: string) => {
    setPurchaseItems(purchaseItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof PurchaseItem, value: any) => {
    setPurchaseItems(purchaseItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-fill product details when product is selected
        if (field === 'productId' && value) {
          const product = demoProducts.find(p => p.id === value);
          if (product) {
            updatedItem.productName = product.name;
            updatedItem.sku = `${product.sku}-${Date.now().toString().slice(-4)}`;
            updatedItem.purchasePrice = product.purchasePrice;
            updatedItem.salePrice = product.salePrice;
          }
        }
        
        if (field === 'quantity' || field === 'purchasePrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.purchasePrice;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const totalAmount = purchaseItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'create'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add Purchase
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Purchase History
          </button>
        </div>
      </div>

      {activeView === 'create' && (
        <div className="space-y-6">
          {/* Purchase Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Supplier</option>
                  {demoSuppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Purchase Items */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Purchase Items</h3>
              <button
                onClick={addNewItem}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">SKU</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Purchase Price</th>
                    <th className="text-left py-2">Sale Price</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">
                        <select
                          value={item.productId}
                          onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="">Select Product</option>
                          {demoProducts.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2">
                        <input
                          type="text"
                          value={item.sku}
                          readOnly
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50"
                          placeholder="Auto-generated"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          min="1"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          value={item.purchasePrice}
                          onChange={(e) => updateItem(item.id, 'purchasePrice', parseFloat(e.target.value) || 0)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          value={item.salePrice}
                          onChange={(e) => updateItem(item.id, 'salePrice', parseFloat(e.target.value) || 0)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="py-2">
                        <span className="font-medium">Rs. {item.total.toLocaleString()}</span>
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {purchaseItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items added. Click "Add Item" to start.
              </div>
            )}
          </div>

          {/* Purchase Summary */}
          {purchaseItems.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="max-w-md ml-auto space-y-3">
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>Rs. {totalAmount.toLocaleString()}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Complete Purchase
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search by SKU, Product, Supplier..."
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
                  <th className="text-left py-3 px-4">Supplier</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">2024-01-15</td>
                  <td className="py-3 px-4">Tech Suppliers Ltd</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">Rs. 135,000</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">2024-01-14</td>
                  <td className="py-3 px-4">Computer World</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">Rs. 90,000</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
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

export default PurchasesTab;