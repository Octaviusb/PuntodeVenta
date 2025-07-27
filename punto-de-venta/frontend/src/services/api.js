import axios from 'axios';
import config from '../config';
import getBackendPort from '../utils/portReader';

const API_URL = config.apiUrl;

// Crear instancia de axios con configuración base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 segundos de timeout para todas las solicitudes
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Servicios de autenticación
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/users/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    register: async (userData) => {
        return await api.post('/users/register', userData);
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

// Servicios de inventario
export const inventoryService = {
    getAll: async () => {
        return await api.get('/inventory');
    },
    getById: async (id) => {
        return await api.get(`/inventory/${id}`);
    },
    create: async (product) => {
        return await api.post('/inventory', product);
    },
    update: async (id, product) => {
        return await api.put(`/inventory/${id}`, product);
    },
    delete: async (id) => {
        return await api.delete(`/inventory/${id}`);
    }
};

// Servicios de ventas
export const salesService = {
    getAll: async () => {
        return await api.get('/sales');
    },
    getById: async (id) => {
        return await api.get(`/sales/${id}`);
    },
    create: async (sale) => {
        return await api.post('/sales', sale);
    },
    getByDate: async (startDate, endDate) => {
        return await api.get(`/sales/fecha/filtrar?fechaInicio=${startDate}&fechaFin=${endDate}`);
    },
    getSummary: async () => {
        return await api.get('/sales/resumen/dashboard');
    }
};

// Servicios de usuarios
export const userService = {
    getAll: async () => {
        return await api.get('/users');
    },
    getById: async (id) => {
        return await api.get(`/users/${id}`);
    },
    update: async (id, userData) => {
        return await api.put(`/users/${id}`, userData);
    },
    delete: async (id) => {
        return await api.delete(`/users/${id}`);
    }
};

export default api;