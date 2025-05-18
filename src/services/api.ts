const API_BASE_URL = '/api';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null as T, error: (error as Error).message };
    }
  },

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null as T, error: (error as Error).message };
    }
  },

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null as T, error: (error as Error).message };
    }
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null as T, error: (error as Error).message };
    }
  },
}; 