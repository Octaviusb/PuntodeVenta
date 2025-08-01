# Test del Backend

## URLs para probar:

1. **Test básico**: https://backend-puntoventa.onrender.com/
2. **Test API**: https://backend-puntoventa.onrender.com/api/test
3. **Dashboard Summary**: https://backend-puntoventa.onrender.com/api/dashboard/summary

## Test de Login con curl:

```bash
curl -X POST https://backend-puntoventa.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

## Credenciales:
- Email: admin@admin.com
- Password: admin123

Si estos endpoints funcionan, el problema está en el frontend.