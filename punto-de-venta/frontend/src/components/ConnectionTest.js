import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';

const ConnectionTest = () => {
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('testing');
    const testResults = {};

    try {
      // Test 1: Basic API connection
      console.log('Testing API connection to:', config.apiUrl);
      const basicTest = await axios.get(`${config.apiUrl.replace('/api', '')}/`, {
        timeout: 10000
      });
      testResults.basicConnection = {
        success: true,
        message: basicTest.data || 'Conexión exitosa',
        status: basicTest.status
      };
    } catch (error) {
      testResults.basicConnection = {
        success: false,
        message: error.message,
        details: error.response?.data || 'Sin respuesta del servidor'
      };
    }

    try {
      // Test 2: API test endpoint
      const apiTest = await axios.get(`${config.apiUrl}/test`, {
        timeout: 10000
      });
      testResults.apiTest = {
        success: true,
        message: apiTest.data?.message || 'API funcionando',
        timestamp: apiTest.data?.timestamp
      };
    } catch (error) {
      testResults.apiTest = {
        success: false,
        message: error.message,
        details: error.response?.data || 'Endpoint de prueba no disponible'
      };
    }

    try {
      // Test 3: Login with demo credentials
      const loginTest = await axios.post(`${config.apiUrl}/users/login`, {
        email: 'admin@admin.com',
        password: 'admin123'
      }, {
        timeout: 10000
      });
      testResults.loginTest = {
        success: true,
        message: 'Login exitoso',
        user: loginTest.data?.nombre || 'Usuario demo'
      };
    } catch (error) {
      testResults.loginTest = {
        success: false,
        message: error.message,
        details: error.response?.data?.message || 'Error en autenticación'
      };
    }

    setResults(testResults);
    setStatus('completed');
    setLoading(false);
  };

  useEffect(() => {
    // Auto-test on component mount
    testConnection();
  }, []);

  const getStatusColor = (success) => success ? 'success' : 'error';
  const getStatusText = (success) => success ? 'EXITOSO' : 'FALLIDO';

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Diagnóstico de Conexión
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            URL de la API: <strong>{config.apiUrl}</strong>
          </Typography>

          <Button 
            variant="contained" 
            onClick={testConnection} 
            disabled={loading}
            sx={{ mb: 3 }}
          >
            {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
            {loading ? 'Probando...' : 'Probar Conexión'}
          </Button>

          {status !== 'idle' && (
            <Box sx={{ mt: 3 }}>
              {/* Test 1: Basic Connection */}
              <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">1. Conexión Básica</Typography>
                  {results.basicConnection && (
                    <Chip 
                      label={getStatusText(results.basicConnection.success)}
                      color={getStatusColor(results.basicConnection.success)}
                      size="small"
                    />
                  )}
                </Box>
                {results.basicConnection && (
                  <Typography variant="body2" color="text.secondary">
                    {results.basicConnection.message}
                    {results.basicConnection.details && (
                      <><br />Detalles: {JSON.stringify(results.basicConnection.details)}</>
                    )}
                  </Typography>
                )}
              </Box>

              {/* Test 2: API Test */}
              <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">2. Endpoint de Prueba</Typography>
                  {results.apiTest && (
                    <Chip 
                      label={getStatusText(results.apiTest.success)}
                      color={getStatusColor(results.apiTest.success)}
                      size="small"
                    />
                  )}
                </Box>
                {results.apiTest && (
                  <Typography variant="body2" color="text.secondary">
                    {results.apiTest.message}
                    {results.apiTest.timestamp && (
                      <><br />Timestamp: {results.apiTest.timestamp}</>
                    )}
                    {results.apiTest.details && (
                      <><br />Detalles: {JSON.stringify(results.apiTest.details)}</>
                    )}
                  </Typography>
                )}
              </Box>

              {/* Test 3: Login Test */}
              <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">3. Prueba de Login</Typography>
                  {results.loginTest && (
                    <Chip 
                      label={getStatusText(results.loginTest.success)}
                      color={getStatusColor(results.loginTest.success)}
                      size="small"
                    />
                  )}
                </Box>
                {results.loginTest && (
                  <Typography variant="body2" color="text.secondary">
                    {results.loginTest.message}
                    {results.loginTest.user && (
                      <><br />Usuario: {results.loginTest.user}</>
                    )}
                    {results.loginTest.details && (
                      <><br />Detalles: {results.loginTest.details}</>
                    )}
                  </Typography>
                )}
              </Box>

              {/* Summary */}
              {status === 'completed' && (
                <Alert 
                  severity={
                    results.basicConnection?.success && results.apiTest?.success && results.loginTest?.success 
                      ? 'success' 
                      : 'warning'
                  }
                  sx={{ mt: 2 }}
                >
                  {results.basicConnection?.success && results.apiTest?.success && results.loginTest?.success
                    ? 'Todas las pruebas pasaron exitosamente. El sistema debería funcionar correctamente.'
                    : 'Algunas pruebas fallaron. Revisa los detalles arriba para identificar problemas de conectividad.'
                  }
                </Alert>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConnectionTest;