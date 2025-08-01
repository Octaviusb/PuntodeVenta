# Arreglar Render - Mantener Gratis

## 🔧 Problema Actual
- Render ejecuta archivos incorrectos
- Conflicto MongoDB vs PostgreSQL
- Rutas 404 y errores 500

## ✅ Solución Simple (30 minutos)

### 1. Limpiar proyecto
```bash
# Eliminar archivos conflictivos
rm -rf punto-de-venta/backend/routes/dashboard.js  # El problemático
rm -rf punto-de-venta/backend/config/database.js   # PostgreSQL
```

### 2. Usar solo MongoDB
```javascript
// server.js (único archivo)
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas (gratis)
mongoose.connect(process.env.MONGODB_URI);

// Rutas simples
app.post('/api/users/login', (req, res) => {
  // Tu lógica de login
});

app.listen(process.env.PORT || 3001);
```

### 3. Variables en Render
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/puntoventa
NODE_ENV=production
JWT_SECRET=tu_clave
```

### 4. package.json
```json
{
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}
```

## 🎯 Resultado
- ✅ Render gratis funcionando
- ✅ MongoDB Atlas gratis
- ✅ Sin cold starts problemáticos
- ✅ $0 costo total

## ⏱️ Tiempo estimado: 30 minutos