import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Inicio from './inicio/inicio';
import Test from './test/test';
import Perfil from './perfil/perfil';
import PanelAdministrativo from './panelAdministrativo/panelAdministrativo';
import SeleccionTest from './seleccionTest/seleccionTest';
import EditarPerfil from './perfil/editarPerfil';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/inicio" element={ <Inicio /> } />
            <Route path="/test" element={ <Test /> } />
            <Route path="/perfil" element={ <Perfil /> } />
            <Route path="/panelAdmin" element={ <PanelAdministrativo /> } />
            <Route path="/seleccionTest" element={ <SeleccionTest /> } />
            <Route path="/editarPerfil" element={ <EditarPerfil /> } />
        </Routes>
    </div>
  );
}
export default App;