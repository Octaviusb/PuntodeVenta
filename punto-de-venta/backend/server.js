const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
require('dotenv').config();
const userRoutes = require('./src/routes/users');
// const dashboardRoutes = require('./src/routes/dashboard'); // Comentado - usando endpoints directos
const inventoryRoutes = require('./src/routes/inventory');
const fs = require('fs');
const path = require('path');

// Leer el puerto del archivo port.txt si existe
let PORT = process.env.PORT || 3001;
try {
  const portFilePath = path.join(__dirname, 'port.txt');
  if (fs.existsSync(portFilePath)) {
    const portFromFile = fs.readFileSync(portFilePath, 'utf8').trim();
    PORT = parseInt(portFromFile) || PORT;
  }
} catch (error) {
  console.log('No se pudo leer el archivo port.txt:', error.message);
}

const app = express();

// Configuración CORS más segura y optimizada
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://puntode-venta-six.vercel.app' // En producción, limitar a dominios específicos
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://127.0.0.1:3000'], // En desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 horas
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta para probar conexión con la base de datos
app.get('/api/test-db', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json({ success: true, time: rows[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('API punto de venta funcionando correctamente.');
});

// Rutas de usuarios
app.use('/api/users', userRoutes);
// Dashboard endpoints directos
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
app.use('/api/inventory', inventoryRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  const environment = process.env.NODE_ENV || 'desarrollo';
  console.log(`✅ Servidor backend activo en modo "${environment}" en el puerto ${PORT}`);
});



