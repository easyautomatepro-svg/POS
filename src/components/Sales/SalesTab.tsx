import React, { useState } from 'react';
import { Plus, Minus, Search, Calendar, FileText } from 'lucide-react';
import { Sale, SaleItem, Product, Customer } from '../../types';

const SalesTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'create' | 'history'>('create');
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [searchSKU, setSearchSKU] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  // Demo data
  const demoProducts: Product[] = [
    { id: '1', name: 'Laptop HP Pavilion', category: 'Laptops', sku: 'LP001', purchasePrice: 45000, salePrice: 55000, stock: 10, lowStockThreshold: 5, supplierId: '1', createdAt: new Date().toISOString() },
    { id: '2', name: 'Mouse Logitech', category: 'Accessories', sku: 'MS001', purchasePrice: 1500, salePrice: 2000, stock: 25, lowStockThreshold: 10, supplierId: '1', createdAt: new Date().toISOString() },
  ];

  const demoCustomers: Customer[] = [
    { id: '1', name: 'Ahmad Ali', contact: '03001234567', email: 'ahmad@email.com', address: 'Mailsi', createdAt: new Date().toISOString() },
    { id: '2', name: 'Fatima Khan', contact: '03007654321', email: 'fatima@email.com', address: 'Mailsi', createdAt: new Date().toISOString() },
  ];

  const addNewItem = () => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      productId: '',
      sku: '',
      productName: '',
      quantity: 1,
      price: 0,
      total: 0,
    };
    setSaleItems([...saleItems, newItem]);
  };

  const removeItem = (id: string) => {
    setSaleItems(saleItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof SaleItem, value: any) => {
    setSaleItems(saleItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const searchProduct = (sku: string, itemId: string) => {
    const product = demoProducts.find(p => p.sku.toLowerCase() === sku.toLowerCase());
    if (product) {
      updateItem(itemId, 'productId', product.id);
      updateItem(itemId, 'sku', product.sku);
      updateItem(itemId, 'productName', product.name);
      updateItem(itemId, 'price', product.salePrice);
    }
  };

  const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0);
  const finalTotal = subtotal - discount;

  const generateInvoiceNo = () => {
    return `INV-${Date.now()}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'create'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Create Sale
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sales History
          </button>
        </div>
      </div>

      {activeView === 'create' && (
        <div className="space-y-6">
          {/* Sale Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice No.</label>
                <input
                  type="text"
                  value={generateInvoiceNo()}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Customer</option>
                  {demoCustomers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sale Items */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sale Items</h3>
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
                    <th className="text-left py-2">SKU</th>
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {saleItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">
                        <div className="flex">
                          <input
                            type="text"
                            value={item.sku}
                            onChange={(e) => updateItem(item.id, 'sku', e.target.value)}
                            onBlur={(e) => searchProduct(e.target.value, item.id)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="SKU"
                          />
                          <button
                            onClick={() => searchProduct(item.sku, item.id)}
                            className="ml-1 p-1 text-blue-600 hover:text-blue-800"
                          >
                            <Search className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2">
                        <input
                          type="text"
                          value={item.productName}
                          readOnly
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50"
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
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
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

            {saleItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items added. Click "Add Item" to start.
              </div>
            )}
          </div>

          {/* Sale Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Discount:</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 border border-gray-300 rounded text-right"
                />
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Final Total:</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales History</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search by invoice, customer..."
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
                  <th className="text-left py-3 px-4">Invoice No.</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">INV-001</td>
                  <td className="py-3 px-4">2024-01-15</td>
                  <td className="py-3 px-4">Ahmad Ali</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">Rs. 57,000</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FileText className="h-4 w-4" />
                    </button>
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

export default SalesTab;