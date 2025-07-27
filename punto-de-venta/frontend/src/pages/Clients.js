import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Clients() {
  const [clients, setClients] = useState([
    { _id: '1', nombre: 'Cliente Uno', contacto: 'Ana Pérez', telefono: '555-1234', email: 'ana.perez@example.com', direccion: 'Calle Falsa 123' },
    { _id: '2', nombre: 'Cliente Dos', contacto: 'Luis Gómez', telefono: '555-5678', email: 'luis.gomez@example.com', direccion: 'Avenida Siempre Viva 742' },
    { _id: '3', nombre: 'Cliente Tres', contacto: 'María López', telefono: '555-8765', email: 'maria.lopez@example.com', direccion: 'Boulevard Central 456' },
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
      // Update existing client
      setClients(clients.map(client => client._id === formData._id ? formData : client));
      toast.success('Cliente actualizado correctamente');
    } else {
      // Add new client
      const newClient = { ...formData, _id: (clients.length + 1).toString() };
      setClients([...clients, newClient]);
      toast.success('Cliente agregado correctamente');
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

  const handleEdit = (client) => {
    setFormData(client);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (clientId) => {
    if (!window.confirm('¿Está seguro de eliminar este cliente?')) return;
    setClients(clients.filter(client => client._id !== clientId));
    toast.success('Cliente eliminado correctamente');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Clientes</h2>
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
          {showForm ? 'Cancelar' : 'Nuevo Cliente'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <div className="card-header">
            {editMode ? 'Editar Cliente' : 'Nuevo Cliente'}
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
                {editMode ? 'Actualizar Cliente' : 'Guardar Cliente'}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Cargando clientes...</p>
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
              {clients.map(client => (
                <tr key={client._id}>
                  <td>{client._id}</td>
                  <td>{client.nombre}</td>
                  <td>{client.contacto}</td>
                  <td>{client.telefono}</td>
                  <td>{client.email}</td>
                  <td>{client.direccion}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleEdit(client)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(client._id)}
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

export default Clients;
