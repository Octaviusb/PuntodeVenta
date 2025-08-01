const config = {
  apiUrl: 'https://backend-puntoventa.onrender.com/api',

  connection: {
    timeout: 10000,
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

export default config;

