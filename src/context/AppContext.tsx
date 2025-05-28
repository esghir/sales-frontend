import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, CartItem } from '../types';

interface AppContextType {
  user: User | null;
  token: string | null;
  cart: CartItem[];
  login: (userData: any) => void;
  logout: () => void;
  updateCart: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = (userData: any) => {
    setUser(userData.user || { id: 1, username: userData.username });
    setToken(userData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
  };

  const updateCart = async () => {
    if (user && token) {
      try {
        const response = await fetch(`/api/cart/${user.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setCart(Array.isArray(data.items) ? data.items : []);
      } catch (error) {
        console.error('Error updating cart:', error);
        setCart([]);
      }
    }
  };

  return (
    <AppContext.Provider value={{ user, token, cart, login, logout, updateCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 