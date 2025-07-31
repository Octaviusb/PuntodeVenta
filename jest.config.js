// jest.config.js
module.exports = {
  // Preset de Jest para React
  preset: 'react-scripts',
  
  // Directorio raíz para resolver rutas
  rootDir: '.',
  
  // Directorios donde Jest buscará archivos de prueba
  roots: ['<rootDir>/punto-de-venta/frontend/src'],
  
  // Patrones para encontrar archivos de prueba
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  
  // Archivos que se ejecutan antes de cada suite de pruebas
  setupFilesAfterEnv: ['<rootDir>/punto-de-venta/frontend/src/setupTests.js'],
  
  // Entorno de prueba
  testEnvironment: 'jsdom',
  
  // Mapeo de módulos para manejar importaciones de estilos y otros recursos
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/punto-de-venta/frontend/src/$1'
  },
  
  // Transformaciones para diferentes tipos de archivos
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  
  // Archivos y directorios que se ignoran durante las pruebas
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/punto-de-venta/frontend/node_modules/'
  ],
  
  // Directorios donde Jest buscará dependencias
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    '<rootDir>/punto-de-venta/frontend/node_modules'
  ]
};
