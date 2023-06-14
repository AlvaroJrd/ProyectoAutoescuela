import React, { useState } from 'react';
import './perfil.css';
import axios from "axios";
import Header from '../header/header';
import Footer from '../footer/footer';
import { FaPen, FaAddressCard, FaUser, FaFileSignature, FaEnvelope, FaRegCalendarAlt, FaSearchLocation, FaCity, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
  document.body.style = 'background: #fff6eb;';
  const storedUserData = localStorage.getItem('datosUsuario');
  const datosUsuario = storedUserData ? JSON.parse(storedUserData) : null;
  datosUsuario.fecha_nacimiento = '01/01/2003';
  const navigate = useNavigate()

  const [nombre, setNombre] = useState(datosUsuario.nombre);
  const [correo, setCorreo] = useState(datosUsuario.correo);
  const [fechaNacimiento, setFechaNacimiento] = useState(datosUsuario.fecha_nacimiento);
  const [fechaNacimientoFormateada, setFechaNacimientoFormateada] = useState("");
  const [codigoPostal, setCodigoPostal] = useState(datosUsuario.codigo_postal);
  const [nacionalidad, setNacionalidad] = useState(datosUsuario.nacionalidad);
  const [municipio, setMunicipio] = useState(datosUsuario.municipio);

  function handleChange(event) {
    const { name, value } = event.target;
  
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'fechaNacimiento':
        setFechaNacimiento(value);
        cambiarFormatoFecha(value);
        break;
      case 'correo':
        setCorreo(value);
        break;
      case 'codigoPostal':
        setCodigoPostal(value);
        break;
      case 'nacionalidad':
        setNacionalidad(value);
        break;
      case 'municipio':
        setMunicipio(value);
        break;
      default:
        break;
    }
  }

  const cambiarFormatoFecha = (value) => {
    const fecha = new Date(value);

    const dia = fecha.getDate() <= 9 ? '0'+fecha.getDate() : fecha.getDate();
    const mes = (fecha.getMonth() + 1) <= 9 ? '0'+(fecha.getMonth() + 1) : fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const anio = fecha.getFullYear();

    const fechaFormateada = dia+'/'+mes+'/'+anio;

    setFechaNacimientoFormateada(fechaFormateada);
    console.log(fechaFormateada)
  }

  const editarUser = () => {
    axios
      .put("http://localhost:5000/users/"+datosUsuario._id, {
        nombre: nombre,
        fecha_nacimiento: fechaNacimientoFormateada,
        correo: correo,
        codigo_postal: codigoPostal,
        nacionalidad: nacionalidad,
        municipio: municipio,
      })
      .then(() => {
        datosUsuario.nombre = nombre;
        datosUsuario.fecha_nacimiento = fechaNacimientoFormateada;
        datosUsuario.correo = correo;
        datosUsuario.codigo_postal = codigoPostal;
        datosUsuario.nacionalidad = nacionalidad;
        datosUsuario.municipio = municipio;

        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
        navigate('/perfil');
        console.log("Solicitud UPDATE exitosa");
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error.response.data);
      });

    
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
                  <h3 class="titulo">
                    <input
                      
                      type="text"
                      id="nombreCompleto"
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                      placeholder="Nombre completo"
                    />
                  </h3>
                  <p class="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div class="perfil-usuario-footer">
                  <ul class="lista-datos">
                      <li><FaUser size={20} className='mx-2'/>DNI: {datosUsuario.dni}</li>
                      <li><FaEnvelope size={20} className='mx-2'/>Correo: 
                        <input
                                className='mx-2'
                                type="text"
                                id="correo"
                                value={correo}
                                onChange={handleChange}
                                name="correo"
                            />
                      </li>
                      <li><FaRegCalendarAlt size={20} className='mx-2'/>Fecha nacimiento: 
                        <input
                            className='mx-2 col-5'
                            type="date"
                            id="fechaNacimiento"
                            value={fechaNacimiento}
                            onChange={handleChange}
                            name="fechaNacimiento"
                        />  
                      </li>
                      <li><FaFileSignature size={20} className='mx-2'/>Test realizados: {datosUsuario.test_realizados}</li>
                  </ul>
                  <ul class="lista-datos">
                      <li><FaSearchLocation size={20} className='mx-2'/>Codigo Postal: 
                        <input
                          className='mx-2 col-6'
                          type="number"
                          id="codigoPostal"
                          name="codigoPostal"
                          value={codigoPostal}
                          onChange={handleChange}
                          placeholder="Codigo postal"
                        />
                      </li>
                      <li><FaMapMarkedAlt size={20} className='mx-2'/>Nacionalidad: 
                      <input
                        className='mx-2 col-6'
                        type="text"
                        id="nacionalidad"
                        value={nacionalidad}
                        name="nacionalidad"
                        onChange={handleChange}
                        placeholder="Nacionalidad"
                      /> 
                      </li>
                      <li><FaCity size={20} className='mx-2'/>Municipio: 
                      <input
                        className='mx-2 col-7'
                        type="text"
                        id="municipio"
                        value={municipio}
                        name="municipio"
                        onChange={handleChange}
                        placeholder="Municipio"
                      />
                      </li>
                      <li><FaAddressCard size={20} className='mx-2'/>Tipo de carnet: {datosUsuario.tipo_carnet}</li>
                  </ul>
              </div>
              <div class="redes-sociales">
                <button onClick={editarUser} class="botonEdit edit"><FaPen size={23} /></button>
            </div>
          </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default EditarPerfil;