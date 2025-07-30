const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
require('dotenv').config();
const userRoutes = require('./src/routes/users');
const dashboardRoutes = require('./src/routes/dashboard');
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
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inventory', inventoryRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  const environment = process.env.NODE_ENV || 'desarrollo';
  console.log(`✅ Servidor backend activo en modo "${environment}" en el puerto ${PORT}`);
});



