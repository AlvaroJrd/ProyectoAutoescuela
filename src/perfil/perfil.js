import React from 'react';
import './perfil.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { FaPen, FaAddressCard, FaUser, FaFileSignature, FaEnvelope, FaRegCalendarAlt, FaSearchLocation, FaCity, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  document.body.style = 'background: #fff6eb;';
  const storedUserData = localStorage.getItem('datosUsuario');
  const datosUsuario = storedUserData ? JSON.parse(storedUserData) : null;
  const navigate = useNavigate()

  const editarPerfil = () => {
    navigate('/editarPerfil');
  }

  return (
    <div>
    <Header />
    <div className="container">
      <section class="seccion-perfil-usuario">
          <div class="perfil-usuario-header">
              <div class="perfil-usuario-portada">
                  <div class="perfil-usuario-avatar">
                      <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="img-avatar"/>
                  </div>
              </div>
          </div>
          <div class="perfil-usuario-body">
              <div class="perfil-usuario-bio">
                  <h3 class="titulo">{datosUsuario.nombre}</h3>
                  <p class="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div class="perfil-usuario-footer">
                  <ul class="lista-datos">
                      <li><FaUser size={20} className='mx-2'/>DNI: {datosUsuario.dni}</li>
                      <li><FaEnvelope size={20} className='mx-2'/>Correo: {datosUsuario.correo}</li>
                      <li><FaRegCalendarAlt size={20} className='mx-2'/>Fecha nacimiento: {datosUsuario.fecha_nacimiento}</li>
                      <li><FaFileSignature size={20} className='mx-2'/>Test realizados: {datosUsuario.test_realizados}</li>
                  </ul>
                  <ul class="lista-datos">
                      <li><FaSearchLocation size={20} className='mx-2'/>Codigo Postal: {datosUsuario.codigo_postal}</li>
                      <li><FaMapMarkedAlt size={20} className='mx-2'/>Nacionalidad: {datosUsuario.nacionalidad}</li>
                      <li><FaCity size={20} className='mx-2'/>Municipio: {datosUsuario.municipio}</li>
                      <li><FaAddressCard size={20} className='mx-2'/>Tipo de carnet: {datosUsuario.tipo_carnet}</li>
                  </ul>
              </div>
              <div class="redes-sociales">
                <button onClick={editarPerfil} class="botonEdit edit"><FaPen size={23} /></button>
            </div>
          </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default Perfil;