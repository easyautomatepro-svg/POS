import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for development
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@alicomputer.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: '2',
    email: 'manager@alicomputer.com',
    name: 'Manager User',
    role: 'manager',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: '3',
    email: 'user@alicomputer.com',
    name: 'Regular User',
    role: 'user',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

const ROLE_PERMISSIONS = {
  admin: ['*'], // All permissions
  manager: [
    'sales.create', 'sales.read', 'sales.update',
    'inventory.create', 'inventory.read', 'inventory.update',
    'purchases.create', 'purchases.read', 'purchases.update',
    'returns.create', 'returns.read', 'returns.update',
    'expenses.create', 'expenses.read', 'expenses.update',
    'reports.read',
    'customers.create', 'customers.read', 'customers.update',
    'suppliers.create', 'suppliers.read', 'suppliers.update',
    'products.create', 'products.read', 'products.update',
  ],
  user: [
    'sales.create', 'sales.read',
    'inventory.read',
    'purchases.read',
    'returns.create', 'returns.read',
    'expenses.create', 'expenses.read',
    'customers.read',
    'suppliers.read',
    'products.read',
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('alicomputer_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('alicomputer_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in production, this would be a real API call
    const user = DEMO_USERS.find(u => u.email === email);
    
    if (user && password === 'password123') {
      localStorage.setItem('alicomputer_user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('alicomputer_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    
    const userPermissions = ROLE_PERMISSIONS[authState.user.role];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};