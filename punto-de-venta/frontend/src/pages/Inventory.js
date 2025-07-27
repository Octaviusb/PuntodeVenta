import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    cantidad: 0,
    precio: 0,
    codigo: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${config.apiUrl}/inventory`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar el inventario');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (editMode) {
        // Actualizar producto existente
        const productId = formData._id;
        await axios.put(`${config.apiUrl}/inventory/${productId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Producto actualizado correctamente');
      } else {
        // Crear nuevo producto
        await axios.post(`${config.apiUrl}/inventory`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Producto guardado correctamente');
      }
      
      // Limpiar formulario y recargar productos
      setFormData({
        nombre: '',
        categoria: '',
        cantidad: 0,
        precio: 0,
        codigo: ''
      });
      setEditMode(false);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Error al guardar producto:', err);
      toast.error('Error al guardar el producto');
      setError('Error al guardar el producto');
    }
  };

  // Función para editar un producto
  const handleEdit = (product) => {
    setFormData({
      _id: product._id,
      nombre: product.nombre,
      categoria: product.categoria,
      cantidad: product.cantidad,
      precio: product.precio,
      codigo: product.codigo || ''
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Función para eliminar un producto
  const handleDelete = async (productId) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;
    
    try {
      const token = localStorage.getItem('token');
      
      await axios.delete(`${config.apiUrl}/inventory/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      toast.success('Producto eliminado correctamente');
      fetchProducts();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      toast.error('Error al eliminar el producto');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventario</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            if (showForm && editMode) {
              // Si estamos en modo edición, resetear el formulario
              setFormData({
                nombre: '',
                categoria: '',
                cantidad: 0,
                precio: 0,
                codigo: ''
              });
              setEditMode(false);
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>
      
      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            {editMode ? 'Editar Producto' : 'Nuevo Producto'}
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="categoria" className="form-label">Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="cantidad" className="form-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="precio" className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="codigo" className="form-label">Código</label>
                  <input
                    type="text"
                    className="form-control"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-success">
                {editMode ? 'Actualizar Producto' : 'Guardar Producto'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <p>Cargando inventario...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map(product => (
                  <tr key={product._id}>
                    <td>{product.codigo || '-'}</td>
                    <td>{product.nombre}</td>
                    <td>{product.categoria}</td>
                    <td>{product.cantidad}</td>
                    <td>${product.precio}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No hay productos en el inventario</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Inventory;