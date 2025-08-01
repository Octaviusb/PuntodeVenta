const express = require('express');
const router = express.Router();

// Rutas simples sin controlador
router.get('/summary', (req, res) => {
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
                "Compra registrada por $1200.00",
                "Usuario inicio sesion",
                "Cierre de caja con balance $3250.25"
            ]
        }
    });
});

router.get('/top-products', (req, res) => {
    res.json({ 
        message: 'Productos mas vendidos',
        data: [
            { nombre: 'Smartphone XYZ', cantidad: 42, total: 21000.00 },
            { nombre: 'Laptop Pro', cantidad: 18, total: 36000.00 },
            { nombre: 'Auriculares Bluetooth', cantidad: 65, total: 3250.00 },
            { nombre: 'Monitor 24', cantidad: 24, total: 7200.00 },
            { nombre: 'Teclado Mecanico', cantidad: 30, total: 3000.00 }
        ]
    });
});

router.get('/sales-by-period', (req, res) => {
    res.json({ 
        message: 'Ventas por periodo',
        data: {
            labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
            datasets: [
                {
                    label: 'Ventas diarias',
                    data: [4500, 3800, 5200, 4900, 6100, 8500, 5800]
                }
            ]
        }
    });
});

module.exports = router;
