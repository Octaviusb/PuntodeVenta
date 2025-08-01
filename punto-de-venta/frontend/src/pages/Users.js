import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'vendedor'
  });

  // Obtener token del localStorage
  const getToken = () => localStorage.getItem('token');

  // Cargar usuarios simulados
  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Datos simulados de usuarios
      const simulatedUsers = [
        { _id: '1', nombre: 'Administrador', email: 'admin@admin.com', rol: 'admin', activo: true },
        { _id: '2', nombre: 'Juan Pérez', email: 'juan@empresa.com', rol: 'vendedor', activo: true },
        { _id: '3', nombre: 'María García', email: 'maria@empresa.com', rol: 'cajero', activo: true },
        { _id: '4', nombre: 'Carlos López', email: 'carlos@empresa.com', rol: 'inventario', activo: true },
        { _id: '5', nombre: 'Ana Martínez', email: 'ana@empresa.com', rol: 'vendedor', activo: false }
      ];
      
      setUsers(simulatedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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
      if (editMode) {
        // Actualizar usuario existente (simulado)
        setUsers(users.map(user => 
          user._id === formData._id 
            ? { ...user, nombre: formData.nombre, email: formData.email, rol: formData.rol }
            : user
        ));
        alert('Usuario actualizado correctamente');
      } else {
        // Crear nuevo usuario (simulado)
        const newUser = {
          _id: Date.now().toString(),
          nombre: formData.nombre,
          email: formData.email,
          rol: formData.rol,
          activo: true
        };
        setUsers([...users, newUser]);
        alert('Usuario creado correctamente');
      }
      
      // Resetear el formulario
      setShowForm(false);
      setEditMode(false);
      setFormData({
        nombre: '',
        email: '',
        password: '',
        rol: 'vendedor'
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const getRoleBadgeClass = (rol) => {
    switch (rol) {
      case 'admin':
        return 'bg-danger';
      case 'vendedor':
        return 'bg-primary';
      case 'inventario':
        return 'bg-success';
      case 'cajero':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  // Función para editar usuario
  const handleEdit = (user) => {
    setFormData({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      password: '', // No incluimos la contraseña por seguridad
      rol: user.rol
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Función para activar/desactivar usuario (simulado)
  const handleToggleActive = async (user) => {
    try {
      setUsers(users.map(u => 
        u._id === user._id ? { ...u, activo: !u.activo } : u
      ));
      alert(`Usuario ${!user.activo ? 'activado' : 'desactivado'} correctamente`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cambiar el estado del usuario');
    }
  };

  // Función para eliminar usuario (simulado)
  const handleDelete = async (userId) => {
    if (!window.confirm('¿Está seguro de eliminar este usuario?')) return;
    
    try {
      setUsers(users.filter(user => user._id !== userId));
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el usuario');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            if (showForm && editMode) {
              // Si estamos en modo edición, resetear el formulario
              setFormData({
                nombre: '',
                email: '',
                password: '',
                rol: 'vendedor'
              });
              setEditMode(false);
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancelar' : 'Nuevo Usuario'}
        </button>
      </div>
      
      {showForm && (
        <div className="card mb-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <div className="card-header">
            {editMode ? 'Editar Usuario' : 'Nuevo Usuario'}
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
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="rol" className="form-label">Rol</label>
                  <select
                    className="form-select"
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="inventario">Inventario</option>
                    <option value="cajero">Cajero</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn btn-success">
                {editMode ? 'Actualizar Usuario' : 'Guardar Usuario'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="table-responsive" style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <table className="table table-striped" style={{ minWidth: '700px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${getRoleBadgeClass(user.rol)}`}>
                      {user.rol === 'admin' ? 'Administrador' : 
                       user.rol === 'vendedor' ? 'Vendedor' : 
                       user.rol === 'inventario' ? 'Inventario' : 'Cajero'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.activo ? 'bg-success' : 'bg-secondary'}`}>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleToggleActive(user)}
                    >
                      {user.activo ? 'Desactivar' : 'Activar'}
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
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

export default Users;