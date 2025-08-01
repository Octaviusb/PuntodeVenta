import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
// import { toast } from 'react-toastify';
import '../styles/login.css';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('Intentando login con:', { email, apiUrl: config.apiUrl });
      
      const response = await axios.post(`${config.apiUrl}/users/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: config.connection.timeout
      });

      console.log('Respuesta del login:', response.data);
      
      setMessage('Login exitoso');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Redirigir al dashboard inmediatamente
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Error completo de login:', err);
      let errorMsg = 'Error de login: ';
      
      if (err.code === 'ECONNABORTED') {
        errorMsg += 'Tiempo de espera agotado. Verifique su conexión.';
      } else if (err.response) {
        errorMsg += err.response.data?.message || `Error del servidor (${err.response.status})`;
      } else if (err.request) {
        errorMsg += 'No se pudo conectar con el servidor. Verifique la URL de la API.';
      } else {
        errorMsg += err.message || 'Error desconocido';
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 className="m-0 fw-bold">Punto de Venta</h2>
          <p className="mb-0 mt-2 small">Sistema de Gestión Comercial</p>
        </div>
        
        <div className="login-body">
          <div className="text-center mb-4">
            <i className="bi bi-shop fs-1 text-primary mb-3"></i>
            <p className="text-muted">Inicia sesión para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-envelope login-icon"></i>
                </span>
                <input
                  type="email"
                  className="form-control py-2 login-input"
                  id="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                <a href="#" className="text-decoration-none small" onClick={(e) => { e.preventDefault(); alert('Función no disponible'); }}>¿Olvidaste tu contraseña?</a>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-lock login-icon"></i>
                </span>
                <input
                  type="password"
                  className="form-control py-2 login-input"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100 py-2 mb-4 login-button" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </>
              ) : 'Iniciar sesión'}
            </button>
          </form>
          
          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
        
        <div className="login-footer">
          <p className="text-muted small mb-0">
            Credenciales por defecto: <br/>
            <strong>admin@admin.com / admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;