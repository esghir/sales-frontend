import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

interface UserData {
    email: string;
    password: string;
    username: string;
}

interface Credentials {
    username: string;
    password: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

interface OrderData {
    items: Array<{
        productId: number;
        quantity: number;
    }>;
}

export const auth = {
    register: async (userData: UserData) => {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },
    login: async (credentials: Credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;
    },
};

export const products = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/api/products');
        return response.data;
    },
    getById: async (id: number): Promise<Product> => {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    },
    search: async (name: string): Promise<Product[]> => {
        const response = await api.get(`/api/products/search?name=${name}`);
        return response.data;
    },
    getAvailable: async (): Promise<Product[]> => {
        const response = await api.get('/api/products/available');
        return response.data;
    },
};

export const orders = {
    create: async (orderData: OrderData) => {
        const response = await api.post('/api/orders', orderData);
        return response.data;
    },
    getByUser: async () => {
        const response = await api.get('/api/orders/user');
        return response.data;
    },
};

// Export the api instance as a named export
export { api }; 