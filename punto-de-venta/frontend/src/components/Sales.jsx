import { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Sales() {
  const [sales, setSales] = useState([
    { id: 1, fecha: '2023-11-01', total: 150.00, productos: 3 },
    { id: 2, fecha: '2023-11-02', total: 75.50, productos: 2 },
  ]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Ventas
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Nueva Venta
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.fecha}</TableCell>
                <TableCell>S/ {sale.total.toFixed(2)}</TableCell>
                <TableCell>{sale.productos}</TableCell>
                <TableCell>
                  <Button size="small" color="primary">Ver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Sales;