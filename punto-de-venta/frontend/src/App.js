import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Material UI
import { CssBaseline, CircularProgress, Box } from '@mui/material';

// Tema personalizado
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Componentes
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import CashRegister from './pages/CashRegister';
import Purchases from './pages/Purchases';
import Clients from './pages/Clients';
import Suppliers from './pages/Suppliers';
import Company from './pages/Company';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import ConnectionTest from './components/ConnectionTest';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <CssBaseline /> {/* Normaliza los estilos CSS */}
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/test-connection" element={<ConnectionTest />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rutas para todos los módulos */}
              <Route path="/sales" element={<ProtectedRoute><Layout><Sales /></Layout></ProtectedRoute>} />
              <Route path="/inventory" element={<ProtectedRoute><Layout><Inventory /></Layout></ProtectedRoute>} />
              <Route path="/cash-register" element={<ProtectedRoute><Layout><CashRegister /></Layout></ProtectedRoute>} />
              <Route path="/purchases" element={<ProtectedRoute><Layout><Purchases /></Layout></ProtectedRoute>} />
              <Route path="/clients" element={<ProtectedRoute><Layout><Clients /></Layout></ProtectedRoute>} />
              <Route path="/suppliers" element={<ProtectedRoute><Layout><Suppliers /></Layout></ProtectedRoute>} />
              <Route path="/company" element={<ProtectedRoute><Layout><Company /></Layout></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Layout><Users /></Layout></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> */}
        </Router>
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;
