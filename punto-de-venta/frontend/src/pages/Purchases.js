import React, { useState, useEffect } from 'react';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([
    { nombre: '', cantidad: 1, precio: 0, subtotal: 0 }
  ]);
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [selectedFecha, setSelectedFecha] = useState(new Date().toISOString().split('T')[0]);
  const [notas, setNotas] = useState('');

  useEffect(() => {
    // Datos simulados para la demo
    setTimeout(() => {
      setPurchases([
        { 
          id: 1, 
          fecha: '15/06/2023', 
          proveedor: 'Distribuidora ABC', 
          total: 1200.00,
          estado: 'Completada',
          productos: [
            { nombre: 'Smartphone XYZ', cantidad: 2, precio: 400, subtotal: 800 },
            { nombre: 'Auriculares Bluetooth', cantidad: 8, precio: 50, subtotal: 400 }
          ]
        },
        { 
          id: 2, 
          fecha: '10/06/2023', 
          proveedor: 'Mayorista Tech', 
          total: 3500.00,
          estado: 'Completada',
          productos: [
            { nombre: 'Laptop Pro', cantidad: 1, precio: 2000, subtotal: 2000 },
            { nombre: 'Monitor 24"', cantidad: 5, precio: 300, subtotal: 1500 }
          ]
        },
        { 
          id: 3, 
          fecha: '05/06/2023', 
          proveedor: 'Importadora XYZ', 
          total: 950.00,
          estado: 'Pendiente',
          productos: [
            { nombre: 'Teclado Mecánico', cantidad: 5, precio: 100, subtotal: 500 },
            { nombre: 'Mouse Inalámbrico', cantidad: 10, precio: 25, subtotal: 250 },
            { nombre: 'Altavoz Bluetooth', cantidad: 5, precio: 40, subtotal: 200 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleView = (purchase) => {
    alert(`Detalles de la compra ID: ${purchase.id}\nProveedor: ${purchase.proveedor}\nTotal: $${purchase.total.toFixed(2)}`);
  };

  const handleDelete = (purchaseId) => {
    if (!window.confirm('¿Está seguro de eliminar esta compra?')) return;
    setPurchases(purchases.filter(p => p.id !== purchaseId));
  };

  const handleAddProduct = () => {
    setProducts([...products, { nombre: '', cantidad: 1, precio: 0, subtotal: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    if (field === 'cantidad' || field === 'precio') {
      const numValue = Number(value);
      newProducts[index][field] = isNaN(numValue) ? 0 : numValue;
    } else {
      newProducts[index][field] = value;
    }
    newProducts[index].subtotal = newProducts[index].cantidad * newProducts[index].precio;
    setProducts(newProducts);
  };

  const subtotal = products.reduce((sum, p) => sum + p.subtotal, 0);
  const impuestos = subtotal * 0.15; // example 15% tax
  const total = subtotal + impuestos;

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just alert the data
    alert(`Nueva compra guardada:\nProveedor: ${selectedProveedor}\nFecha: ${selectedFecha}\nTotal: $${total.toFixed(2)}`);
    // Reset form
    setSelectedProveedor('');
    setSelectedFecha(new Date().toISOString().split('T')[0]);
    setProducts([{ nombre: '', cantidad: 1, precio: 0, subtotal: 0 }]);
    setNotas('');
    setActiveTab('list');
  };

  return (
    <div className="container mt-4">
      <h2>Compras</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Listado de Compras
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            Nueva Compra
          </button>
        </li>
      </ul>
      
      {activeTab === 'list' ? (
        loading ? (
          <p>Cargando compras...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Proveedor</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map(purchase => (
                  <tr key={purchase.id}>
                    <td>{purchase.id}</td>
                    <td>{purchase.fecha}</td>
                    <td>{purchase.proveedor}</td>
                    <td>${purchase.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${purchase.estado === 'Completada' ? 'bg-success' : 'bg-warning'}`}>
                        {purchase.estado}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => handleView(purchase)}>Ver</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(purchase.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="card">
          <div className="card-header">
            Nueva Compra
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Proveedor</label>
                  <select className="form-select" value={selectedProveedor} onChange={e => setSelectedProveedor(e.target.value)} required>
                    <option value="">Seleccionar proveedor</option>
                    <option value="Distribuidora ABC">Distribuidora ABC</option>
                    <option value="Mayorista Tech">Mayorista Tech</option>
                    <option value="Importadora XYZ">Importadora XYZ</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Fecha</label>
                  <input type="date" className="form-control" value={selectedFecha} onChange={e => setSelectedFecha(e.target.value)} required />
                </div>
              </div>
              
              <h5 className="mt-4">Productos</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <select className="form-select" value={product.nombre} onChange={e => handleProductChange(index, 'nombre', e.target.value)} required>
                            <option value="">Seleccionar producto</option>
                            <option value="Smartphone XYZ">Smartphone XYZ</option>
                            <option value="Laptop Pro">Laptop Pro</option>
                            <option value="Auriculares Bluetooth">Auriculares Bluetooth</option>
                          </select>
                        </td>
                        <td>
                          <input type="number" className="form-control" min="1" value={product.cantidad} onChange={e => handleProductChange(index, 'cantidad', e.target.value)} required />
                        </td>
                        <td>
                          <input type="number" className="form-control" min="0" step="0.01" value={product.precio} onChange={e => handleProductChange(index, 'precio', e.target.value)} required />
                        </td>
                        <td>${product.subtotal.toFixed(2)}</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveProduct(index)}>X</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5">
                        <button type="button" className="btn btn-sm btn-success" onClick={handleAddProduct}>+ Agregar Producto</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="form-label">Notas</label>
                  <textarea className="form-control" rows="3" value={notas} onChange={e => setNotas(e.target.value)}></textarea>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5>Resumen</h5>
                      <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                      <p><strong>Impuestos:</strong> ${impuestos.toFixed(2)}</p>
                      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button type="submit" className="btn btn-primary">Guardar Compra</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setActiveTab('list')}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Purchases;
