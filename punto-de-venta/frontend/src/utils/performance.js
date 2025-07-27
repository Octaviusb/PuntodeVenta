// Utilidad para medir el rendimiento de la aplicación
const performanceMonitor = {
  // Registra el tiempo de inicio de una operación
  startTimer: (operationName) => {
    if (process.env.NODE_ENV === 'development') {
      console.time(`⏱️ ${operationName}`);
    }
    return Date.now();
  },

  // Finaliza el temporizador y registra el tiempo transcurrido
  endTimer: (operationName, startTime) => {
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd(`⏱️ ${operationName}`);
      const elapsed = Date.now() - startTime;
      console.log(`🚀 ${operationName} completado en ${elapsed}ms`);
    }
    return Date.now() - startTime;
  },

  // Registra un evento de rendimiento
  logEvent: (eventName, details = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 [${eventName}]`, details);
    }
  },

  // Verifica la conexión al backend
  checkBackendConnection: async (apiUrl, timeout = 5000) => {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(`${apiUrl}/test`, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      const elapsed = Date.now() - startTime;
      
      if (response.ok) {
        console.log(`✅ Conexión al backend exitosa en ${elapsed}ms`);
        return { success: true, time: elapsed };
      } else {
        console.error(`❌ Error en la conexión al backend: ${response.status}`);
        return { success: false, time: elapsed, status: response.status };
      }
    } catch (error) {
      const elapsed = Date.now() - startTime;
      console.error(`❌ Error en la conexión al backend: ${error.message}`);
      return { 
        success: false, 
        time: elapsed, 
        error: error.name === 'AbortError' ? 'Timeout' : error.message 
      };
    }
  }
};

export default performanceMonitor;