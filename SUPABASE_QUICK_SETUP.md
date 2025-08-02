# Solución Rápida: Supabase (5 minutos)

## 🚀 Por qué Supabase es mejor que Render+MongoDB:
- ✅ **Gratis** hasta 50,000 usuarios
- ✅ **Setup en 5 minutos**
- ✅ **Base de datos PostgreSQL real**
- ✅ **API automática**
- ✅ **Dashboard visual**
- ✅ **Sin problemas de CORS**

## 📋 Pasos:

### 1. Crear cuenta en Supabase
- Ve a https://supabase.com
- Crear proyecto "punto-venta"

### 2. Crear tablas (SQL Editor):
```sql
-- Usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'vendedor',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50),
  nombre VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  precio DECIMAL(10,2),
  cantidad INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ventas
CREATE TABLE ventas (
  id SERIAL PRIMARY KEY,
  total DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT NOW(),
  usuario_id INTEGER REFERENCES usuarios(id)
);

-- Insertar datos iniciales
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Administrador', 'admin@admin.com', 'admin123', 'admin'),
('Octavio Buitrago', 'obuitragocamelo@yaho.es', 'Eneroctavio19447/*', 'admin');

INSERT INTO productos (codigo, nombre, categoria, precio, cantidad) VALUES
('PROD001', 'Smartphone XYZ', 'Electrónicos', 500.00, 25),
('PROD002', 'Laptop Pro', 'Computadoras', 2000.00, 10),
('PROD003', 'Auriculares Bluetooth', 'Accesorios', 50.00, 50);
```

### 3. Obtener credenciales:
- Project Settings → API
- Copiar: `URL` y `anon key`

### 4. Instalar cliente:
```bash
cd punto-de-venta/frontend
npm install @supabase/supabase-js
```

## ⏱️ Tiempo total: 5 minutos
## 💰 Costo: $0 (gratis)
## 🎯 Resultado: Base de datos real funcionando