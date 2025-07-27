import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function CashRegister() {
  const [cashData, setCashData] = useState(null);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    type: 'income',
    description: ''
  });

  // Datos simulados para la demo
  useEffect(() => {
    // Simulamos la carga de datos
    setTimeout(() => {
      setCashData({
        isOpen: true,
        openingAmount: 1000,
        currentBalance: 5280.50,
        openingTime: new Date(Date.now() - 1000 * 60 * 60 * 8).toLocaleString() // 8 horas atrás
      });
      
      setMovements([
        { id: 1, type: 'income', amount: 600, description: 'Venta #1089', date: new Date(Date.now() - 1000 * 60 * 30).toLocaleString() },
        { id: 2, type: 'income', amount: 2125, description: 'Venta #1088', date: new Date(Date.now() - 1000 * 60 * 120).toLocaleString() },
        { id: 3, type: 'expense', amount: 500, description: 'Pago a proveedor', date: new Date(Date.now() - 1000 * 60 * 180).toLocaleString() },
        { id: 4, type: 'income', amount: 1050, description: 'Venta #1087', date: new Date(Date.now() - 1000 * 60 * 240).toLocaleString() },
        { id: 5, type: 'expense', amount: 700, description: 'Compra de insumos', date: new Date(Date.now() - 1000 * 60 * 300).toLocaleString() }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulamos el registro de un nuevo movimiento
    const newMovement = {
      id: movements.length + 1,
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: new Date().toLocaleString()
    };
    
    setMovements([newMovement, ...movements]);
    
    // Actualizamos el balance
    setCashData({
      ...cashData,
      currentBalance: formData.type === 'income' 
        ? cashData.currentBalance + parseFloat(formData.amount)
        : cashData.currentBalance - parseFloat(formData.amount)
    });
    
    // Limpiamos el formulario
    setFormData({
      amount: '',
      type: 'income',
      description: ''
    });
  };

  const handleCloseCash = () => {
    if (window.confirm('¿Estás seguro de cerrar la caja?')) {
      alert(`Caja cerrada con un balance de $${cashData.currentBalance.toFixed(2)}`);
    }
  };

  if (loading) {
    return <div className="text-center p-5">Cargando datos de caja...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Administración de Caja</h2>
      
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              Estado de Caja
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {cashData.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
              </h5>
              <p><strong>Monto de apertura:</strong> ${cashData.openingAmount.toFixed(2)}</p>
              <p><strong>Balance actual:</strong> ${cashData.currentBalance.toFixed(2)}</p>
              <p><strong>Hora de apertura:</strong> {cashData.openingTime}</p>
              
              {cashData.isOpen && (
                <button 
                  className="btn btn-danger w-100" 
                  onClick={handleCloseCash}
                >
                  Cerrar Caja
                </button>
              )}
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header bg-success text-white">
              Registrar Movimiento
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Tipo de Movimiento</label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="income">Ingreso</option>
                    <option value="expense">Egreso</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-info text-white">
              Movimientos de Caja
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Descripción</th>
                      <th>Tipo</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map(movement => (
                      <tr key={movement.id}>
                        <td>{movement.date}</td>
                        <td>{movement.description}</td>
                        <td>
                          <span className={`badge ${movement.type === 'income' ? 'bg-success' : 'bg-danger'}`}>
                            {movement.type === 'income' ? 'Ingreso' : 'Egreso'}
                          </span>
                        </td>
                        <td className={movement.type === 'income' ? 'text-success' : 'text-danger'}>
                          {movement.type === 'income' ? '+' : '-'} ${movement.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashRegister;