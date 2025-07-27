import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { _id: '1', nombre: 'Distribuidora ABC', contacto: 'Roberto Gómez', telefono: '555-1111', email: 'ventas@abc.com', direccion: 'Zona Industrial 123' },
    { _id: '2', nombre: 'Mayorista Tech', contacto: 'Laura Torres', telefono: '555-2222', email: 'info@mayorista-tech.com', direccion: 'Avenida Tecnológica 456' },
    { _id: '3', nombre: 'Importadora XYZ', contacto: 'Miguel Ángel', telefono: '555-3333', email: 'contacto@xyz.com', direccion: 'Calle Comercio 789' },
    { _id: '4', nombre: 'Electrónica Global', contacto: 'Patricia Ramírez', telefono: '555-4444', email: 'ventas@electronica-global.com', direccion: 'Boulevard Principal 321' },
    { _id: '5', nombre: 'Suministros Rápidos', contacto: 'Fernando López', telefono: '555-5555', email: 'pedidos@suministros.com', direccion: 'Calle Rápida 987' },
  ]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: ''
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      setSuppliers(suppliers.map(supplier => supplier._id === formData._id ? formData : supplier));
      toast.success('Proveedor actualizado correctamente');
    } else {
      const newSupplier = { ...formData, _id: (suppliers.length + 1).toString() };
      setSuppliers([...suppliers, newSupplier]);
      toast.success('Proveedor agregado correctamente');
    }

    setFormData({
      nombre: '',
      contacto: '',
      telefono: '',
      email: '',
      direccion: ''
    });
    setEditMode(false);
    setShowForm(false);
  };

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (supplierId) => {
    if (!window.confirm('¿Está seguro de eliminar este proveedor?')) return;
    setSuppliers(suppliers.filter(supplier => supplier._id !== supplierId));
    toast.success('Proveedor eliminado correctamente');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Proveedores</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            if (showForm && editMode) {
              setFormData({
                nombre: '',
                contacto: '',
                telefono: '',
                email: '',
                direccion: ''
              });
              setEditMode(false);
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancelar' : 'Nuevo Proveedor'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <div className="card-header">
            {editMode ? 'Editar Proveedor' : 'Nuevo Proveedor'}
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre de la Empresa</label>
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
                  <label htmlFor="contacto" className="form-label">Persona de Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contacto"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-success">
                {editMode ? 'Actualizar Proveedor' : 'Guardar Proveedor'}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Cargando proveedores...</p>
      ) : (
        <div className="table-responsive" style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <table className="table table-striped" style={{ minWidth: '700px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>{supplier._id}</td>
                  <td>{supplier.nombre}</td>
                  <td>{supplier.contacto}</td>
                  <td>{supplier.telefono}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.direccion}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleEdit(supplier)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(supplier._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Suppliers;
