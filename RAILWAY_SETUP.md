# Despliegue con Railway + MongoDB Atlas

## 🚀 Configuración Railway (5 minutos)

### 1. Crear cuenta en Railway.app
```bash
# Conectar GitHub repo
# Auto-deploy desde main branch
```

### 2. Variables de entorno en Railway
```env
NODE_ENV=production
JWT_SECRET=tu_clave_secreta
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/puntoventa
PORT=3001
```

### 3. MongoDB Atlas (Gratis 500MB)
```bash
# 1. Crear cuenta en mongodb.com/atlas
# 2. Crear cluster gratuito
# 3. Crear usuario y obtener connection string
# 4. Whitelist IP: 0.0.0.0/0 (todas las IPs)
```

### 4. Archivo railway.json
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

## ✅ Ventajas Railway vs Render
- ⚡ 3x más rápido
- 🔄 Deploy en 30 segundos
- 💰 $5/mes (vs $7 Render)
- 🛠️ Mejor interfaz
- 📊 Logs en tiempo real