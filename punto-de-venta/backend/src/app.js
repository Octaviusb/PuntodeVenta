const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet'); // Seguridad HTTP
const rateLimit = require('express-rate-limit'); // Limitar solicitudes
const mongoSanitize = require('express-mongo-sanitize'); // Prevenir inyección NoSQL
require('dotenv').config();

// Import routes
const salesRoutes = require('./routes/sales');
const inventoryRoutes = require('./routes/inventory');
const userRoutes = require('./routes/users');
const cashRegisterRoutes = require('./routes/cashRegister');
const purchasesRoutes = require('./routes/purchases');
const categoriesRoutes = require('./routes/categories');
const clientsRoutes = require('./routes/clients');
const suppliersRoutes = require('./routes/suppliers');
const companyRoutes = require('./routes/company');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 7000;

// Configurar variables de entorno
if (!process.env.JWT_SECRET) {
    // Generar una clave secreta aleatoria si no existe
    const crypto = require('crypto');
    process.env.JWT_SECRET = crypto.randomBytes(64).toString('hex');
    console.warn('ADVERTENCIA: JWT_SECRET no está definido en el archivo .env. Se ha generado una clave aleatoria temporal.');
}

// Conexión a MongoDB con manejo de errores mejorado
let mongoConnected = false;

// Only try to connect to MongoDB if MONGODB_URI is defined
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conectado a MongoDB');
        mongoConnected = true;
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
        console.log('Continuando sin conexión a MongoDB. Algunas funciones pueden no estar disponibles.');
        mongoConnected = false;
    });
} else {
    console.log('MONGODB_URI no está definido. Continuando sin conexión a MongoDB.');
    mongoConnected = false;
}

// Middleware para verificar conexión a MongoDB
const checkMongoDB = (req, res, next) => {
    // Allow dashboard routes to proceed even without MongoDB connection
    // The dashboard controller already handles MongoDB unavailability
    if (!mongoConnected && req.path.includes('/users')) {
        return res.status(500).json({ 
            message: 'Servicio temporalmente no disponible: Error de conexión a la base de datos' 
        });
    }
    next();
};

// Aplicar middleware de verificación de MongoDB
app.use(checkMongoDB);

// Middleware - IMPORTANTE: CORS debe ir antes de definir rutas

// Configuración CORS más segura y optimizada
const getAllowedOrigins = () => {
    if (process.env.NODE_ENV === 'production') {
        const envOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
        return [
            ...envOrigins,
            'https://puntode-venta-six.vercel.app',
            'https://puntoventa-six.vercel.app', 
            'https://punto-venta-six.vercel.app',
            /\.vercel\.app$/  // Permitir cualquier subdominio de vercel.app
        ];
    }
    return ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://127.0.0.1:3000'];
};

const corsOptions = {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 horas
    preflightContinue: false,
    optionsSuccessStatus: 204
};

console.log('CORS configurado para orígenes:', getAllowedOrigins());

app.use(cors(corsOptions));

// Middleware de seguridad
app.use(helmet()); // Cabeceras HTTP seguras

// Limitar solicitudes para prevenir ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 solicitudes por ventana
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos'
});

// Aplicar limitador a todas las rutas de autenticación
app.use('/api/users/login', limiter);

// Prevenir inyección NoSQL
app.use(mongoSanitize());

// Prevenir ataques de Pollution de Parámetros
app.use(bodyParser.json({ limit: '10kb' })); // Limitar tamaño del body
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

// Servir favicon correctamente
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.get('/', (req, res) => {
    res.send('API Punto de Venta funcionando');
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'Conexión exitosa con el backend', timestamp: new Date() });
});

// Test route to check MongoDB connection status
app.get('/api/test-db-status', (req, res) => {
    res.json({ 
        mongoConnected: mongoConnected,
        message: mongoConnected ? 'Conectado a MongoDB' : 'No conectado a MongoDB'
    });
});

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

// Middleware de autenticación global
const auth = require('./middleware/auth');

// Aplicar autenticación solo a rutas específicas (no a login ni test)
app.use('/api/sales', auth);
app.use('/api/inventory', auth);
app.use('/api/cash-register', auth);
app.use('/api/purchases', auth);
app.use('/api/categories', auth);
app.use('/api/clients', auth);
app.use('/api/suppliers', auth);
app.use('/api/company', auth);
app.use('/api/users/profile', auth);

// Routes - Colocadas después de la configuración de autenticación
app.use('/api/users', userRoutes); // Esta ruta incluye login que no requiere autenticación
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cash-register', cashRegisterRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/company', companyRoutes);
// app.use('/api/dashboard', dashboardRoutes); // Comentado - usando endpoints directos

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

