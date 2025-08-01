const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/puntoventa')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('MongoDB error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, default: 'vendedor' },
  activo: { type: Boolean, default: true }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  codigo: String,
  nombre: String,
  categoria: String,
  precio: Number,
  cantidad: Number
});

const Product = mongoose.model('Product', ProductSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Admin por defecto
    if (email === 'admin@admin.com' && password === 'admin123') {
      const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'secret');
      return res.json({
        _id: 'admin',
        nombre: 'Administrador',
        email: 'admin@admin.com',
        rol: 'admin',
        token
      });
    }
    
    if (email === 'obuitragocamelo@yaho.es' && password === 'Eneroctavio19447/*') {
      const token = jwt.sign({ id: 'octavio' }, process.env.JWT_SECRET || 'secret');
      return res.json({
        _id: 'octavio',
        nombre: 'Octavio Buitrago',
        email: 'obuitragocamelo@yaho.es',
        rol: 'admin',
        token
      });
    }
    
    res.status(401).json({ message: 'Credenciales inválidas' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Dashboard
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
  const products = [
    { _id: '1', codigo: 'PROD001', nombre: 'Smartphone XYZ', categoria: 'Electrónicos', cantidad: 25, precio: 500.00 },
    { _id: '2', codigo: 'PROD002', nombre: 'Laptop Pro', categoria: 'Computadoras', cantidad: 10, precio: 2000.00 },
    { _id: '3', codigo: 'PROD003', nombre: 'Auriculares Bluetooth', categoria: 'Accesorios', cantidad: 50, precio: 50.00 }
  ];
  res.json(products);
});

// Users
app.get('/api/users', (req, res) => {
  const users = [
    { _id: '1', nombre: 'Administrador', email: 'admin@admin.com', rol: 'admin', activo: true },
    { _id: '2', nombre: 'Octavio Buitrago', email: 'obuitragocamelo@yaho.es', rol: 'admin', activo: true }
  ];
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});