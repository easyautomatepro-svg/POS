export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  lowStockThreshold: number;
  supplierId: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  invoiceNo: string;
  date: string;
  customerId: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  userId: string;
  createdAt: string;
}

export interface SaleItem {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Purchase {
  id: string;
  date: string;
  supplierId: string;
  items: PurchaseItem[];
  total: number;
  userId: string;
  createdAt: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  total: number;
}

export interface Inventory {
  id: string;
  productId: string;
  sku: string;
  supplierId: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  date: string;
  type: 'purchase' | 'sale' | 'return' | 'adjustment';
  userId: string;
  createdAt: string;
}

export interface Return {
  id: string;
  saleId: string;
  invoiceNo: string;
  date: string;
  items: ReturnItem[];
  total: number;
  reason: string;
  userId: string;
  createdAt: string;
}

export interface ReturnItem {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  userId: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardKPIs {
  totalSales: number;
  totalPurchases: number;
  totalExpenses: number;
  profitLoss: number;
  lowStockItems: number;
  todaySales: number;
  monthlyRevenue: number;
  topSellingProducts: Array<{
    productName: string;
    quantity: number;
    revenue: number;
  }>;
}