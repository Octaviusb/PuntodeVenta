import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pos'); // 'pos' o 'history'

  useEffect(() => {
    if (activeTab === 'history') {
      fetchSales();
    }
  }, [activeTab]);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${config.apiUrl}/sales`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setSales(response.data);
      setError('');
    } catch (err) {
      console.error('Error al cargar ventas:', err);
      setError('Error al cargar el historial de ventas');
    } finally {
      setLoading(false);
    }
  };

  // Función para ver detalles de una venta
  const handleViewSale = async (saleId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${config.apiUrl}/sales/${saleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Aquí podrías mostrar un modal con los detalles de la venta
      alert(`Detalles de la venta ${saleId}:\n\nTotal: $${response.data.total}\nProductos: ${response.data.items?.length || 0}`);
      
    } catch (err) {
      console.error('Error al obtener detalles de la venta:', err);
      toast.error('Error al cargar los detalles de la venta');
    }
  };

  // Función para imprimir una venta
  const handlePrintSale = async (saleId) => {
    try {
      const token = localStorage.getItem('token');
      
      // Aquí iría la lógica para imprimir la venta
      toast.info('Preparando impresión de la venta ' + saleId);
      
      // Simulación de impresión
      setTimeout(() => {
        toast.success('Venta enviada a impresión');
      }, 1500);
      
    } catch (err) {
      console.error('Error al imprimir la venta:', err);
      toast.error('Error al imprimir la venta');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ventas</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'pos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pos')}
          >
            Punto de Venta
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Historial de Ventas
          </button>
        </li>
      </ul>
      
      {activeTab === 'pos' ? (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                Nueva Venta
              </div>
              <div className="card-body">
                <p>Aquí irá el formulario de venta con:</p>
                <ul>
                  <li>Búsqueda de productos</li>
                  <li>Cantidad</li>
                  <li>Precio</li>
                  <li>Subtotal</li>
                </ul>
                <button 
                  className="btn btn-primary"
                  onClick={() => toast.info('Funcionalidad de registro de venta en desarrollo')}
                >
                  Registrar Venta
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                Resumen de Venta
              </div>
              <div className="card-body">
                <p>Total: $0.00</p>
                <p>Efectivo: $0.00</p>
                <p>Cambio: $0.00</p>
                <button 
                  className="btn btn-success w-100 mb-2"
                  onClick={() => toast.info('Funcionalidad de cobro en desarrollo')}
                >
                  Cobrar
                </button>
                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={() => toast.info('Venta cancelada')}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {loading ? (
            <p>Cargando historial de ventas...</p>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Método de Pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 ? (
                  sales.map(sale => (
                    <tr key={sale._id}>
                      <td>{sale._id}</td>
                      <td>{new Date(sale.fecha).toLocaleString()}</td>
                      <td>{sale.cliente?.nombre || 'Cliente General'}</td>
                      <td>${sale.total}</td>
                      <td>{sale.metodoPago}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleViewSale(sale._id)}
                        >
                          Ver
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => handlePrintSale(sale._id)}
                        >
                          Imprimir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No hay ventas registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Sales;