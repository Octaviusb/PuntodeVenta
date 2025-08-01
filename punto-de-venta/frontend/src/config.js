const config = {
  apiUrl: 'https://backend-puntoventa.onrender.com/api',

  connection: {
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1500
  },

  ui: {
    itemsPerPage: 10,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currency: 'COP'
  }
};

export default config;
