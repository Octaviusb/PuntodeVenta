import React, { useState, useEffect } from 'react';

function Company() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    ruc: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    moneda: 'USD',
    impuesto: 18
  });
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    // Datos simulados para la demo
    setTimeout(() => {
      setFormData({
        nombre: 'Mi Empresa S.A.',
        ruc: '20123456789',
        direccion: 'Av. Principal 123, Ciudad',
        telefono: '555-1234',
        email: 'contacto@miempresa.com',
        sitioWeb: 'www.miempresa.com',
        moneda: 'USD',
        impuesto: 18
      });
      setLogoPreview('https://via.placeholder.com/200x100?text=Logo+Empresa');
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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Datos de la empresa actualizados correctamente');
  };

  if (loading) {
    return <div className="text-center p-5">Cargando datos de la empresa...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Datos de la Empresa</h2>
      
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
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
                    <label htmlFor="ruc" className="form-label">RUC / ID Fiscal</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ruc"
                      name="ruc"
                      value={formData.ruc}
                      onChange={handleInputChange}
                      required
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
                    required
                  />
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
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="sitioWeb" className="form-label">Sitio Web</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sitioWeb"
                      name="sitioWeb"
                      value={formData.sitioWeb}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="moneda" className="form-label">Moneda</label>
                    <select
                      className="form-select"
                      id="moneda"
                      name="moneda"
                      value={formData.moneda}
                      onChange={handleInputChange}
                    >
                      <option value="USD">USD - Dólar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="PEN">PEN - Sol Peruano</option>
                      <option value="MXN">MXN - Peso Mexicano</option>
                      <option value="COP">COP - Peso Colombiano</option>
                      <option value="ARS">ARS - Peso Argentino</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="impuesto" className="form-label">Impuesto (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="impuesto"
                      name="impuesto"
                      value={formData.impuesto}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    Logo de la Empresa
                  </div>
                  <div className="card-body text-center">
                    {logoPreview && (
                      <img 
                        src={logoPreview} 
                        alt="Logo de la empresa" 
                        className="img-fluid mb-3" 
                        style={{ maxHeight: '150px' }}
                      />
                    )}
                    <div className="mb-3">
                      <label htmlFor="logo" className="form-label">Seleccionar Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="logo"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </div>
                    <small className="text-muted">
                      Formatos recomendados: PNG, JPG. Tamaño máximo: 2MB
                    </small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Company;