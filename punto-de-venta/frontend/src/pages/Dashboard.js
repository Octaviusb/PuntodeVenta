import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  TrendingUp, 
  Inventory, 
  AccountBalance,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Componentes de gráficos
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Registrar componentes de ChartJS
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

// Componente de tarjeta de estadísticas
const StatCard = ({ title, value, subtitle, icon, color }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          boxShadow: 3,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="div" color="text.secondary">
              {title}
            </Typography>
            <Box 
              sx={{ 
                backgroundColor: alpha(color, 0.1), 
                borderRadius: '50%', 
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {icon}
            </Box>
          </Box>
          <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function Dashboard() {
  const theme = useTheme();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [topProducts, setTopProducts] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Obtener resumen del dashboard
        const summaryResponse = await axios.get(`${config.apiUrl}/dashboard/summary`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000
        });
        
        setSummary(summaryResponse.data);
        
        // Obtener datos de ventas por período
        const salesResponse = await axios.get(`${config.apiUrl}/dashboard/sales-by-period`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000
        });
        
        setSalesData(salesResponse.data);
        
        // Obtener productos más vendidos
        const productsResponse = await axios.get(`${config.apiUrl}/dashboard/top-products`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000
        });
        
        setTopProducts(productsResponse.data);
        
        setError('');
      } catch (err) {
        console.error('Error al cargar datos del dashboard:', err);
        
        if (err.response && err.response.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        } else {
          let errorMessage = 'Error al cargar los datos del dashboard: ';
          
          if (err.code === 'ECONNABORTED') {
            errorMessage += 'Tiempo de espera agotado';
          } else if (err.response) {
            errorMessage += err.response.data?.message || `Error del servidor (${err.response.status})`;
          } else if (err.request) {
            errorMessage += 'No se pudo conectar con el servidor';
          } else {
            errorMessage += err.message || 'Error desconocido';
          }
          
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Configuración para el gráfico de ventas
  const salesChartData = {
    labels: salesData?.data?.labels || ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Ventas diarias',
        data: salesData?.data?.datasets[0]?.data || [4500, 3800, 5200, 4900, 6100, 8500, 5800],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        tension: 0.4
      }
    ]
  };

  // Configuración para el gráfico de productos más vendidos
  const topProductsData = {
    labels: topProducts?.data?.map(product => product.nombre) || ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'],
    datasets: [
      {
        label: 'Unidades vendidas',
        data: topProducts?.data?.map(product => product.cantidad) || [42, 18, 65, 24, 30],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.warning.main
        ],
        borderWidth: 1
      }
    ]
  };

  // Configuración para el gráfico de distribución de ventas
  const salesDistributionData = {
    labels: ['Efectivo', 'Tarjeta', 'Transferencia'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.primary.main,
          theme.palette.info.main
        ],
        borderWidth: 0
      }
    ]
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tablero Principal
      </Typography>
      
      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Ventas de Hoy" 
            value={`$${summary?.data?.salesSummary?.today?.total || 0}`}
            subtitle={`${summary?.data?.salesSummary?.today?.count || 0} transacciones`}
            icon={<TrendingUp sx={{ color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Inventario" 
            value={summary?.data?.inventory?.totalProducts || 0}
            subtitle={`${summary?.data?.inventory?.lowStock || 0} productos con bajo stock`}
            icon={<Inventory sx={{ color: theme.palette.success.main }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Caja Actual" 
            value={`$${summary?.data?.cashRegister?.currentBalance || 0}`}
            subtitle={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    ${summary?.data?.cashRegister?.todayMovements?.income || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="error.main">
                    ${summary?.data?.cashRegister?.todayMovements?.expense || 0}
                  </Typography>
                </Box>
              </Box>
            }
            icon={<AccountBalance sx={{ color: theme.palette.info.main }} />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>
      
      {/* Gráficos y actividad reciente */}
      <Grid container spacing={3}>
        {/* Gráfico de ventas */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Ventas de la Semana
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={salesChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Actividad reciente */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Actividad Reciente
              </Typography>
              <List>
                {summary?.data?.recentActivity?.length > 0 ? (
                  summary.data.recentActivity.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText primary={activity} />
                      </ListItem>
                      {index < summary.data.recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No hay actividad reciente" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Productos más vendidos */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Productos Más Vendidos
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar 
                  data={topProductsData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Distribución de ventas */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Métodos de Pago
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '70%', height: '70%' }}>
                  <Doughnut 
                    data={salesDistributionData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;