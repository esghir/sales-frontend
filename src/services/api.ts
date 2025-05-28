// API base URL - replace with your actual API URL
const API_BASE = 'https://your-api-domain.com';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API service functions
export const api = {
  // Auth APIs
  register: async (userData: any) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  // Product APIs
  getProducts: async () => {
    const response = await fetch(`${API_BASE}/api/products`);
    return response.json();
  },

  getProduct: async (id: number) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`);
    return response.json();
  },

  createProduct: async (product: any, token: string) => {
    const response = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    return response.json();
  },

  updateProduct: async (id: number, product: any, token: string) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    return response.json();
  },

  deleteProduct: async (id: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.ok;
  },

  // Cart APIs
  getCart: async (userId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/cart/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  addToCart: async (userId: number, productId: number, quantity: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/cart/${userId}/items?productId=${productId}&quantity=${quantity}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateCartItem: async (userId: number, productId: number, quantity: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/cart/${userId}/items/${productId}?quantity=${quantity}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  removeFromCart: async (userId: number, productId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/cart/${userId}/items/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  clearCart: async (userId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/cart/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.ok;
  },

  // Order APIs
  getUserOrders: async (userId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/orders/user/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getOrder: async (orderId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  createOrder: async (userId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/orders/user/${userId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateOrderStatus: async (orderId: number, status: string, token: string) => {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/status?status=${status}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  cancelOrder: async (orderId: number, token: string) => {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.ok;
  }
}; 