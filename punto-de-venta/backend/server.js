const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS simple
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('API punto de venta funcionando correctamente.');
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando', timestamp: new Date() });
});

// Login endpoint
app.post('/api/users/login', (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  if (email === 'admin@admin.com' && password === 'admin123') {
    res.json({
      _id: 'demo-user-id',
      nombre: 'Usuario Demo',
      email: 'admin@admin.com',
      rol: 'admin',
      token: 'demo-token-123'
    });
  } else {
    res.status(401).json({ message: 'Credenciales invalidas' });
  }
});

// Test login endpoint
app.get('/api/users/test', (req, res) => {
  res.json({ message: 'Users endpoint funcionando' });
});

// Dashboard endpoints
app.get('/api/dashboard/summary', (req, res) => {
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
    message: 'Productos mas vendidos',
    data: [
      { nombre: 'Smartphone XYZ', cantidad: 42, total: 21000.00 },
      { nombre: 'Laptop Pro', cantidad: 18, total: 36000.00 },
      { nombre: 'Auriculares Bluetooth', cantidad: 65, total: 3250.00 }
    ]
  });
});

app.get('/api/dashboard/sales-by-period', (req, res) => {
  res.json({ 
    message: 'Ventas por periodo',
    data: {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      datasets: [{
        label: 'Ventas diarias',
        data: [4500, 3800, 5200, 4900, 6100]
      }]
    }
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  const environment = process.env.NODE_ENV || 'desarrollo';
  console.log(`✅ Servidor backend activo en modo "${environment}" en el puerto ${PORT}`);
});



