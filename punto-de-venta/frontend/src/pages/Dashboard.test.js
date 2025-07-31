import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import axios from 'axios';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn()
}));

// Mock config
jest.mock('../config', () => ({
  apiUrl: 'https://backend-puntoventa.onrender.com/api'
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock token in localStorage
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'test-token';
      if (key === 'user') return JSON.stringify({ id: 1, name: 'Test User' });
      return null;
    });
  });

  test('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('Tablero Principal')).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    // Mock axios to throw an error
    axios.get.mockRejectedValue(new Error('Network error'));

    render(<Dashboard />);
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar los datos del dashboard/)).toBeInTheDocument();
    });
  });

  test('displays dashboard data when API call succeeds', async () => {
    // Mock successful API responses
    axios.get
      .mockResolvedValueOnce({
        data: {
          message: 'Resumen del dashboard',
          data: {
            salesSummary: {
              today: { count: 5, total: 1500.00 },
              week: { count: 25, total: 7500.00 },
              month: { count: 100, total: 30000.00 }
            },
            inventory: {
              totalProducts: 150,
              lowStock: 5,
              categories: 10
            },
            cashRegister: {
              currentBalance: 2500.00,
              todayMovements: { income: 1500.00, expense: 500.00 }
            },
            recentActivity: [
              "Venta #1001 registrada por $1500.00 - hace 10 minutos"
            ]
          }
        }
      })
      .mockResolvedValueOnce({
        data: {
          message: 'Ventas por período',
          data: {
            labels: ['Lunes', 'Martes', 'Miércoles'],
            datasets: [
              {
                label: 'Ventas diarias',
                data: [1000, 1500, 2000]
              }
            ]
          }
        }
      })
      .mockResolvedValueOnce({
        data: {
          message: 'Productos más vendidos',
          data: [
            { nombre: 'Producto A', cantidad: 10, total: 500.00 },
            { nombre: 'Producto B', cantidad: 15, total: 750.00 }
          ]
        }
      });

    render(<Dashboard />);
    
    // Wait for data to load and check if elements are rendered
    await waitFor(() => {
      expect(screen.getByText('Ventas de Hoy')).toBeInTheDocument();
      expect(screen.getByText('$1500')).toBeInTheDocument();
      expect(screen.getByText('5 transacciones')).toBeInTheDocument();
    });
  });
});
