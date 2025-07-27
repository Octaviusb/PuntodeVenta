import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Sistema de Punto de Venta
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
        Gestiona tu negocio de manera eficiente
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          component={Link} 
          to="/dashboard"
          sx={{ mx: 1 }}
        >
          Ir al Dashboard
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          size="large" 
          component={Link} 
          to="/login"
          sx={{ mx: 1 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
}

export default Home;