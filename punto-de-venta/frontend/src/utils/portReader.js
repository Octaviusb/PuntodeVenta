// Función para leer el puerto del backend desde localStorage o usar el predeterminado
const getBackendPort = () => {
  try {
    // Intentar leer el puerto desde localStorage (si ya se ha guardado)
    const savedPort = localStorage.getItem('backendPort');
    if (savedPort) {
      return savedPort;
    }
    
    // Si no hay puerto guardado, usar el puerto por defecto
    return '7000';
  } catch (error) {
    console.error('Error al leer el puerto del backend:', error);
    return '7000'; // Puerto por defecto
  }
};

export default getBackendPort;