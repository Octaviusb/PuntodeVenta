const config = {
  apiUrl: 'https://backend-puntoventa.onrender.com/api',

  connection: {
    timeout: 10000, // Aumentar timeout para conexiones lentas
    retryAttempts: 3,
    retryDelay: 2000
  },

  ui: {
    itemsPerPage: 10,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currency: 'COP'
  }
};

