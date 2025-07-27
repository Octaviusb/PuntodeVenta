import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function TestConnection() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        // Configuración explícita para CORS con timeout
        const response = await axios.get(`${config.apiUrl}/test`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: false,
          timeout: config.connection?.timeout || 5000 // Usar timeout de la configuración
        });
        setMessage(response.data.message);
        setError('');
        setRetryCount(0); // Reiniciar contador de intentos
      } catch (err) {
        console.error('Error de conexión:', err);
        
        // Intentar reconectar si no hemos excedido el límite de intentos
        if (retryCount < (config.connection?.retryAttempts || 3)) {
          setError(`Error de conexión. Reintentando (${retryCount + 1}/${config.connection?.retryAttempts || 3})...`);
          setRetryCount(prevCount => prevCount + 1);
          
          // Programar un nuevo intento después de un retraso
          setTimeout(testConnection, config.connection?.retryDelay || 1500);
          return;
        }
        
        // Si hemos agotado los intentos, mostrar el error final
        if (err.code === 'ECONNABORTED') {
          setError('Tiempo de espera agotado. El servidor no responde. Verifique que el backend esté en ejecución.');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Error de red: No se puede conectar al servidor. Verifique que el backend esté en ejecución en el puerto 7000.');
        } else {
          setError('Error de conexión con el backend: ' + 
            (err.response?.data?.message || err.message || 'Error desconocido'));
        }
        setMessage('');
      } finally {
        if (retryCount >= (config.connection?.retryAttempts || 3) || !error) {
          setLoading(false);
        }
      }
    };

    // Usar un timeout para no bloquear la carga de la aplicación
    const timeoutId = setTimeout(testConnection, 100);
    return () => clearTimeout(timeoutId);
  }, [retryCount, error]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Prueba de Conexión</h5>
        {loading ? (
          <p>Probando conexión con el backend{retryCount > 0 ? ` (Intento ${retryCount}/${config.connection?.retryAttempts || 3})` : ''}...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="alert alert-success">{message}</div>
        )}
      </div>
    </div>
  );
}

export default TestConnection;