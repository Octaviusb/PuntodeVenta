import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/main.css'; // Importamos nuestros estilos personalizados

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// Se ha quitado React.StrictMode para evitar dobles renderizados en desarrollo
// que podrían causar múltiples solicitudes al backend