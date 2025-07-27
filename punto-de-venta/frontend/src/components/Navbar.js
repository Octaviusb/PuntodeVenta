import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">Punto de Venta</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sales">Ventas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventory">Inventario</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cash-register">Caja</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/purchases">Compras</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Administración
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/clients">Clientes</Link></li>
                <li><Link className="dropdown-item" to="/suppliers">Proveedores</Link></li>
                <li><Link className="dropdown-item" to="/company">Empresa</Link></li>
                {user?.rol === 'admin' && (
                  <li><Link className="dropdown-item" to="/users">Usuarios</Link></li>
                )}
              </ul>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <span className="text-light me-3">{user?.nombre || 'Usuario'}</span>
            <button onClick={handleLogout} className="btn btn-outline-light">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
