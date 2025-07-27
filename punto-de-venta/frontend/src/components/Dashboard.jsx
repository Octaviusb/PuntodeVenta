import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, CircularProgress, Box } from '@mui/material';
import { salesService, inventoryService } from '../services/api';

function Dashboard() {
  const [salesSummary, setSalesSummary] = useState(null);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Obtener resumen de ventas
        const salesResponse = await salesService.getSummary();
        setSalesSummary(salesResponse.data);
        
        // Obtener conteo de inventario
        const inventoryResponse = await inventoryService.getAll();
        setInventoryCount(inventoryResponse.data.length);
        
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos del dashboard:', err);
        setError('Error al cargar los datos. Por favor, intenta de nuevo.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tablero Principal
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Ventas Hoy</Typography>
            <Typography variant="h3" color="primary">
              S/ {salesSummary?.ventasHoy?.total?.toFixed(2) || '0.00'}
            </Typography>
            <Typography variant="body2">
              {salesSummary?.ventasHoy?.cantidad || 0} transacciones
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Productos en Stock</Typography>
            <Typography variant="h3" color="secondary">{inventoryCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Ventas del Mes</Typography>
            <Typography variant="h3" color="success.main">
              S/ {salesSummary?.ventasMes?.total?.toFixed(2) || '0.00'}
            </Typography>
            <Typography variant="body2">
              {salesSummary?.ventasMes?.cantidad || 0} transacciones
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;