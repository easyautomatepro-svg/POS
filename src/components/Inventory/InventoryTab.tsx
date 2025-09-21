import React, { useState } from 'react';
import { Plus, Minus, Search, Package, AlertTriangle } from 'lucide-react';
import { Inventory, Product, Supplier } from '../../types';

const InventoryTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'add' | 'history'>('add');
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);

  // Demo data
  const demoProducts: Product[] = [
    { id: '1', name: 'Laptop HP Pavilion', category: 'Laptops', sku: 'LP001', purchasePrice: 45000, salePrice: 55000, stock: 10, lowStockThreshold: 5, supplierId: '1', createdAt: new Date().toISOString() },
    { id: '2', name: 'Mouse Logitech', category: 'Accessories', sku: 'MS001', purchasePrice: 1500, salePrice: 2000, stock: 25, lowStockThreshold: 10, supplierId: '1', createdAt: new Date().toISOString() },
    { id: '3', name: 'Keyboard Mechanical', category: 'Accessories', sku: 'KB001', purchasePrice: 3000, salePrice: 4000, stock: 3, lowStockThreshold: 5, supplierId: '2', createdAt: new Date().toISOString() },
  ];

  const demoSuppliers: Supplier[] = [
    { id: '1', name: 'Tech Suppliers Ltd', contact: '03001234567', email: 'tech@suppliers.com', address: 'Lahore', createdAt: new Date().toISOString() },
    { id: '2', name: 'Computer World', contact: '03007654321', email: 'info@computerworld.com', address: 'Karachi', createdAt: new Date().toISOString() },
  ];

  const addNewItem = () => {
    const newItem = {
      id: Date.now().toString(),
      productId: '',
      supplierId: '',
      quantity: 1,
      purchasePrice: 0,
      salePrice: 0,
      sku: '',
    };
    setInventoryItems([...inventoryItems, newItem]);
  };

  const removeItem = (id: string) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: any) => {
    setInventoryItems(inventoryItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-generate SKU when product is selected
        if (field === 'productId' && value) {
          const product = demoProducts.find(p => p.id === value);
          if (product) {
            updatedItem.sku = `${product.sku}-${Date.now().toString().slice(-4)}`;
            updatedItem.purchasePrice = product.purchasePrice;
            updatedItem.salePrice = product.salePrice;
          }
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const lowStockProducts = demoProducts.filter(product => product.stock <= product.lowStockThreshold);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('add')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add Inventory
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Inventory History
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Low Stock Alert</h3>
          </div>
          <div className="space-y-1">
            {lowStockProducts.map(product => (
              <p key={product.id} className="text-sm text-yellow-700">
                {product.name} ({product.sku}) - Only {product.stock} left (Threshold: {product.lowStockThreshold})
              </p>
            ))}
          </div>
        </div>
      )}

      {activeView === 'add' && (
        <div className="space-y-6">
          {/* Add Inventory Form */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Inventory Items</h3>
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
                    <th className="text-left py-2">Supplier</th>
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">SKU</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Purchase Price</th>
                    <th className="text-left py-2">Sale Price</th>
                    <th className="text-left py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">
                        <select
                          value={item.supplierId}
                          onChange={(e) => updateItem(item.id, 'supplierId', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="">Select Supplier</option>
                          {demoSuppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                          ))}
                        </select>
                      </td>
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

            {inventoryItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items added. Click "Add Item" to start.
              </div>
            )}

            {inventoryItems.length > 0 && (
              <div className="mt-4 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Save Inventory
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Inventory History</h3>
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
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Supplier</th>
                  <th className="text-left py-3 px-4">Qty</th>
                  <th className="text-left py-3 px-4">Purchase Price</th>
                  <th className="text-left py-3 px-4">Sale Price</th>
                  <th className="text-left py-3 px-4">Current Stock</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {demoProducts.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono">{product.sku}</td>
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">
                      {demoSuppliers.find(s => s.id === product.supplierId)?.name}
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Rs. {product.purchasePrice.toLocaleString()}</td>
                    <td className="py-3 px-4">Rs. {product.salePrice.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock <= product.lowStockThreshold
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">2024-01-15</td>
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

export default InventoryTab;