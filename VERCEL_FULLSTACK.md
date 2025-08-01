# Solución Full-Stack en Vercel

## 🚀 Vercel + PlanetScale (MySQL)

### 1. Estructura del proyecto
```
punto-de-venta/
├── frontend/          # React app
├── api/              # Vercel serverless functions
│   ├── users/
│   │   └── login.js
│   ├── inventory/
│   │   └── index.js
│   └── dashboard/
│       └── summary.js
└── vercel.json
```

### 2. Vercel.json configuración
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### 3. API Serverless (api/users/login.js)
```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // Lógica de login
    const user = await prisma.user.findUnique({
      where: { email }
    });
    res.json(user);
  }
}
```

### 4. PlanetScale (MySQL gratis)
```bash
# 1. Crear cuenta en planetscale.com
# 2. Crear database "puntoventa"
# 3. Obtener connection string
# 4. Usar Prisma como ORM
```

## ✅ Ventajas
- 🆓 Completamente gratis
- ⚡ Ultra rápido (edge functions)
- 🔄 Deploy automático
- 🛡️ Escalable automáticamente