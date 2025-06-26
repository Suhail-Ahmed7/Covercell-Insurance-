import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'shop_owner' | 'employee' | 'customer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shop?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth token
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login logic - replace with actual API call
    const demoUsers: Record<string, User> = {
      'admin@covercell.com': {
        id: '1',
        name: 'Admin User',
        email: 'admin@covercell.com',
        role: 'admin'
      },
      'shop@covercell.com': {
        id: '2',
        name: 'Shop Owner',
        email: 'shop@covercell.com',
        role: 'shop_owner',
        shop: 'Tech Repair Hub'
      },
      'employee@covercell.com': {
        id: '3',
        name: 'Employee',
        email: 'employee@covercell.com',
        role: 'employee',
        shop: 'Tech Repair Hub'
      },
      'customer@example.com': {
        id: '4',
        name: 'John Customer',
        email: 'customer@example.com',
        role: 'customer'
      }
    };

    if (demoUsers[email] && password === 'password') {
      const userData = demoUsers[email];
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};