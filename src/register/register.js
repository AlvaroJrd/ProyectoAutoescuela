import React, { useEffect, useState } from "react";
import "./register.css";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaRegCalendarAlt,
  FaSearchLocation,
  FaCity,
  FaMapMarkedAlt,
  FaAddressCard,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  document.body.style =
    "background: linear-gradient(to bottom, #F8A8D8, #A6FDF2);";
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaNacimientoFormateada, setFechaNacimientoFormateada] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [tipoCarnet, setTipoCarnet] = useState("B");
  const [terminos, setTerminos] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case "dni":
        setDni(value);
        break;
      case "nombre":
        setNombre(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordRepeat":
        setPasswordRepeat(value);
        break;
      case "tipoCarnet":
        setTipoCarnet(value);
        console.log(value);
        break;
      case "fechaNacimiento":
        setFechaNacimiento(value);
        cambiarFormatoFecha(value);
        break;
      case "correo":
        setCorreo(value);
        break;
      case "codigoPostal":
        setCodigoPostal(value);
        break;
      case "nacionalidad":
        setNacionalidad(value);
        break;
      case "municipio":
        setMunicipio(value);
        break;
      case "terminos":
        setTerminos(!terminos);
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

  async function handleSubmit() {
    if (
      true
    ) {
      
      await axios
        .post("http://localhost:5000/users", {
          dni: dni,
          nombre: nombre,
          contraseña: password,
          tipo_carnet: tipoCarnet,
          fecha_nacimiento: fechaNacimientoFormateada,
          test_realizados: 0,
          correo: correo,
          codigo_postal: codigoPostal,
          nacionalidad: nacionalidad,
          municipio: municipio,
        })
        .then(() => {
          console.log("Solicitud POST exitosa");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error.response.data);
        });
    } else {
      console.log("Error de autenticacion");
      // MENSAJE DE ERROR CAMPOS VACIOS
    }
  }

  return (
    <div className="register-container">
      <h1 className="register-header">REGISTER</h1>
      <hr className="separador" />
      <form>
        <div className="row mx-3">
          <div className="input-container m-3 col">
            <FaUser size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="text"
              id="nombreCompleto"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
          </div>

          <div className="input-container m-3 col">
            <FaUser size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="text"
              id="dni"
              value={dni}
              name="dni"
              onChange={handleChange}
              placeholder="DNI"
            />
          </div>
        </div>
        <div className="row mx-3">
          <div className="input-container m-3 col">
            <FaLock size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
          <div className="input-container m-3 col">
            <FaLock size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="password"
              id="passwordRepeat"
              value={passwordRepeat}
              name="passwordRepeat"
              onChange={handleChange}
              placeholder="Repetir contraseña"
            />
          </div>
        </div>
        <div className="row mx-3">
          <div className="input-container m-3 col">
            <FaEnvelope size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="email"
              id="correo"
              value={correo}
              name="correo"
              onChange={handleChange}
              placeholder="Correo"
            />
          </div>
          <div className="input-container m-3 col">
            <FaSearchLocation size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="number"
              id="codigoPostal"
              name="codigoPostal"
              value={codigoPostal}
              onChange={handleChange}
              placeholder="Codigo postal"
            />
          </div>
        </div>
        <div className="row mx-3">
          <div className="input-container m-3 col">
            <FaCity size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="text"
              id="municipio"
              value={municipio}
              name="municipio"
              onChange={handleChange}
              placeholder="Municipio"
            />
          </div>
          <div className="input-container m-3 col">
            <FaMapMarkedAlt size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="text"
              id="nacionalidad"
              value={nacionalidad}
              name="nacionalidad"
              onChange={handleChange}
              placeholder="Nacionalidad"
            />
          </div>
        </div>
        <div className="row mx-3">
          <div className="input-container m-3 col">
            <FaRegCalendarAlt size={20} className="input-icon mx-2" />
            <input
              className="input-field"
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              name="fechaNacimiento"
              onChange={handleChange}
              placeholder="Fecha de nacimiento"
            />
          </div>

          <div className="input-container m-3 col">
            <FaAddressCard size={20} className="input-icon mx-2" />
            <select
              placeholder="Tipo de carné"
              onChange={handleChange}
              className="input-field"
              name="tipoCarnet"
            >
              <option value="B">B</option>
              <option value="A">A</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
        <div className="row mx-3">
          <label className="col">
            <input
              type="checkbox"
              className="mx-2"
              id="terminos"
              value={terminos}
              name="terminos"
              onChange={handleChange}
            />
            He leido y acepto los <a href="/prueba">términos</a> y{" "}
            <a href="/prueba">condiciones de uso</a>
          </label>
          <label className="col">
            <input type="checkbox" className="mx-2" />
            Acepto recibir noticias y ofertas al correo
          </label>
        </div>
        <div className="mt-4 col-12 d-flex justify-content-center">
          <button type="button" id="buttonRegister" onClick={handleSubmit}>
            REGISTER
          </button>
        </div>
        <div className="mx-3 d-flex justify-content-end">
          <p className="small">
            <Link to="/" className="no-link-style">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
