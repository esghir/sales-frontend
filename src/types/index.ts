export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  role?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
} 