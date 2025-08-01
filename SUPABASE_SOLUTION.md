# Solución Supabase (Backend as a Service)

## 🚀 Supabase - La más fácil

### 1. Configuración (2 minutos)
```bash
# 1. Crear cuenta en supabase.com
# 2. Crear proyecto "punto-venta"
# 3. Obtener URL y API Key
```

### 2. Instalar cliente
```bash
npm install @supabase/supabase-js
```

### 3. Configuración en React
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tu-proyecto.supabase.co'
const supabaseKey = 'tu-api-key'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 4. Ejemplo de uso
```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'password'
})

// Obtener productos
const { data: products } = await supabase
  .from('productos')
  .select('*')

// Crear producto
const { data, error } = await supabase
  .from('productos')
  .insert([{ nombre: 'Producto', precio: 100 }])
```

## ✅ Ventajas Supabase
- 🆓 Gratis hasta 50,000 usuarios
- 🔐 Autenticación incluida
- 📊 Dashboard visual
- 🔄 Tiempo real
- 📱 APIs automáticas
- 🛡️ Row Level Security

## 📋 Tablas necesarias
```sql
-- usuarios (automática con auth)
-- productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50),
  nombre VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  precio DECIMAL(10,2),
  stock INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ventas
CREATE TABLE ventas (
  id SERIAL PRIMARY KEY,
  total DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT NOW(),
  usuario_id UUID REFERENCES auth.users(id)
);
```