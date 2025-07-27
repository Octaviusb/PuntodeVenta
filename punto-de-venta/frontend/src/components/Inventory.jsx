import { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Inventory() {
  const [products, setProducts] = useState([
    { id: 1, nombre: 'Producto 1', categoria: 'Electrónica', cantidad: 10, precio: 50.00 },
    { id: 2, nombre: 'Producto 2', categoria: 'Hogar', cantidad: 15, precio: 25.50 },
  ]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Inventario
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Nuevo Producto
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.categoria}</TableCell>
                <TableCell>{product.cantidad}</TableCell>
                <TableCell>S/ {product.precio.toFixed(2)}</TableCell>
                <TableCell>
                  <Button size="small" color="primary">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Inventory;