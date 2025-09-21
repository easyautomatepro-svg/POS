import React, { useState } from 'react';
import { Users, Building, Package, Upload, Download, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'users' | 'customers' | 'suppliers' | 'products' | 'import-export'>('users');
  const { hasPermission } = useAuth();

  const settingSections = [
    { id: 'users', label: 'User Management', icon: Users, permission: 'users.read' },
    { id: 'customers', label: 'Customer Management', icon: Users, permission: 'customers.read' },
    { id: 'suppliers', label: 'Supplier Management', icon: Building, permission: 'suppliers.read' },
    { id: 'products', label: 'Product Management', icon: Package, permission: 'products.read' },
    { id: 'import-export', label: 'Import/Export Data', icon: Upload, permission: 'data.manage' },
  ];

  const filteredSections = settingSections.filter(section => 
    hasPermission(section.permission) || hasPermission('*')
  );

  // Demo data
  const demoUsers = [
    { id: '1', name: 'Admin User', email: 'admin@alicomputer.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Manager User', email: 'manager@alicomputer.com', role: 'manager', status: 'active' },
    { id: '3', name: 'Regular User', email: 'user@alicomputer.com', role: 'user', status: 'active' },
  ];

  const demoCustomers = [
    { id: '1', name: 'Ahmad Ali', contact: '03001234567', email: 'ahmad@email.com', address: 'Mailsi' },
    { id: '2', name: 'Fatima Khan', contact: '03007654321', email: 'fatima@email.com', address: 'Mailsi' },
  ];

  const demoSuppliers = [
    { id: '1', name: 'Tech Suppliers Ltd', contact: '03001234567', email: 'tech@suppliers.com', address: 'Lahore' },
    { id: '2', name: 'Computer World', contact: '03007654321', email: 'info@computerworld.com', address: 'Karachi' },
  ];

  const demoProducts = [
    { id: '1', name: 'Laptop HP Pavilion', category: 'Laptops', sku: 'LP001', stock: 10, threshold: 5 },
    { id: '2', name: 'Mouse Logitech', category: 'Accessories', sku: 'MS001', stock: 25, threshold: 10 },
    { id: '3', name: 'Keyboard Mechanical', category: 'Accessories', sku: 'KB001', stock: 3, threshold: 5 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <SettingsIcon className="h-6 w-6 text-gray-500" />
      </div>

      <div className="flex space-x-6">
        {/* Settings Navigation */}
        <div className="w-64 bg-white rounded-lg shadow-sm border p-4">
          <nav className="space-y-2">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {/* User Management */}
          {activeSection === 'users' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customer Management */}
          {activeSection === 'customers' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Customer Management</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Customer
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Contact</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Address</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4">{customer.contact}</td>
                        <td className="py-3 px-4">{customer.email}</td>
                        <td className="py-3 px-4">{customer.address}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Supplier Management */}
          {activeSection === 'suppliers' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Supplier Management</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Supplier
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Contact</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Address</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoSuppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{supplier.name}</td>
                        <td className="py-3 px-4">{supplier.contact}</td>
                        <td className="py-3 px-4">{supplier.email}</td>
                        <td className="py-3 px-4">{supplier.address}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Management */}
          {activeSection === 'products' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">SKU</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Low Stock Alert</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4 font-mono">{product.sku}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock <= product.threshold
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">{product.threshold}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Import/Export Data */}
          {activeSection === 'import-export' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium text-gray-900 mb-2">Import Products</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload CSV file with product data</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Choose File
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium text-gray-900 mb-2">Import Customers</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload CSV file with customer data</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Choose File
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Sales Data', description: 'Export all sales transactions' },
                    { label: 'Inventory Data', description: 'Export current inventory status' },
                    { label: 'Customer Data', description: 'Export customer information' },
                    { label: 'Financial Reports', description: 'Export profit & loss reports' },
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{item.label}</h4>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;