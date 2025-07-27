// Configuración de la aplicación
const config = {
  // URL base de la API
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:7000/api',
  
  // Configuración de conexión
  connection: {
    timeout: 5000,        // Timeout en milisegundos
    retryAttempts: 3,     // Número de intentos de reconexión
    retryDelay: 1500      // Tiempo entre intentos en milisegundos
  },
  
  // Configuración de la interfaz
  ui: {
    itemsPerPage: 10,     // Elementos por página en tablas
    dateFormat: 'DD/MM/YYYY', // Formato de fecha
    timeFormat: 'HH:mm',  // Formato de hora
    currency: 'MXN'       // Moneda predeterminada
  }
};

export default config;