import React from 'react';
import TestConnection from '../components/TestConnection';
import Login from '../components/Login';

function Home() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Sistema de Punto de Venta</h1>
        <p className="lead">
          Bienvenido al sistema de punto de venta diseñado para pequeñas y medianas empresas.
        </p>
        <hr className="my-4" />
        <p>
          Este sistema te permite gestionar inventario, ventas, usuarios y más.
        </p>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <TestConnection />
        </div>
        <div className="col-md-6">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Home;