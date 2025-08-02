const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Punto de Venta funcionando',
    timestamp: new Date(),
    routes: ['/api/users/login', '/api/dashboard/summary', '/api/inventory']
  });
});

// Login
app.post('/api/users/login', (req, res) => {
  console.log('Login request:', req.body);
  const { email, password } = req.body;
  
  if (email === 'admin@admin.com' && password === 'admin123') {
    return res.json({
      _id: 'admin',
      nombre: 'Administrador',
      email: 'admin@admin.com',
      rol: 'admin',
      token: 'demo-token-admin'
    });
  }
  
  if (email === 'obuitragocamelo@yaho.es' && password === 'Eneroctavio19447/*') {
    return res.json({
      _id: 'octavio',
      nombre: 'Octavio Buitrago',
      email: 'obuitragocamelo@yaho.es',
      rol: 'admin',
      token: 'demo-token-octavio'
    });
  }
  
  res.status(401).json({ message: 'Credenciales inválidas' });
});

// Dashboard
app.get('/api/dashboard/summary', (req, res) => {
  console.log('Dashboard summary requested');
  res.json({
    message: 'Resumen del dashboard',
    data: {
      salesSummary: {
        today: { count: 12, total: 4850.75 },
        week: { count: 87, total: 32450.50 },
        month: { count: 342, total: 128750.25 }
      },
      inventory: {
        totalProducts: 248,
        lowStock: 15,
        categories: 8
      },
      cashRegister: {
        currentBalance: 5280.50,
        todayMovements: { income: 4850.75, expense: 1200.00 }
      },
      recentActivity: [
        "Venta registrada por $450.75",
        "Producto actualizado",
        "Compra registrada por $1200.00"
      ]
    }
  });
});

app.get('/api/dashboard/top-products', (req, res) => {
  res.json({
    message: 'Productos más vendidos',
    data: [
      { nombre: 'Smartphone XYZ', cantidad: 42, total: 21000.00 },
      { nombre: 'Laptop Pro', cantidad: 18, total: 36000.00 },
      { nombre: 'Auriculares Bluetooth', cantidad: 65, total: 3250.00 }
    ]
  });
});

app.get('/api/dashboard/sales-by-period', (req, res) => {
  res.json({
    message: 'Ventas por período',
    data: {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: 'Ventas diarias',
        data: [4500, 3800, 5200, 4900, 6100, 8500, 5800]
      }]
    }
  });
});

// Inventory
app.get('/api/inventory', (req, res) => {
  res.json([
    { _id: '1', codigo: 'PROD001', nombre: 'Smartphone XYZ', categoria: 'Electrónicos', cantidad: 25, precio: 500.00 },
    { _id: '2', codigo: 'PROD002', nombre: 'Laptop Pro', categoria: 'Computadoras', cantidad: 10, precio: 2000.00 },
    { _id: '3', codigo: 'PROD003', nombre: 'Auriculares Bluetooth', categoria: 'Accesorios', cantidad: 50, precio: 50.00 }
  ]);
});

// Users
app.get('/api/users', (req, res) => {
  res.json([
    { _id: '1', nombre: 'Administrador', email: 'admin@admin.com', rol: 'admin', activo: true },
    { _id: '2', nombre: 'Octavio Buitrago', email: 'obuitragocamelo@yaho.es', rol: 'admin', activo: true }
  ]);
});

// Catch all
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
});