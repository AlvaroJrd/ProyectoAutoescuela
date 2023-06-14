import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { FaUser, FaLock, FaFacebook } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  document.body.style = 'background: linear-gradient(to bottom, #F8A8D8, #A6FDF2);';
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [datosUsuario, setDatosUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(datosUsuario); // Se ejecuta cuando datosUsuario cambia
  }, [datosUsuario]);

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    
  };

  async function handleSubmit(){
    if(dni !== '' && password !== ''){
      await axios.get('http://localhost:5000/users/dni/?dni='+dni+'&password='+password)
      .then((response) => {
        if(response.data != null){
          setDatosUsuario(response.data); 
          localStorage.setItem('datosUsuario', JSON.stringify(response.data));
          navigate("/inicio");
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
      console.log(datosUsuario);
    }else {
      console.log('Error de autenticacion');
    }
  };

  

  return (
    <div className="login-container">
      <h1 className="login-header">LOGIN</h1>
      <form>
        <div className="input-container m-3">
          <FaUser size={20} className='input-icon mx-2'/>
          <input
            className='input-field'
            type="text"
            id="dni"
            value={dni}
            onChange={handleDniChange}
            placeholder='DNI'
          />

        </div>
        <div className="input-container m-3">
          <FaLock size={20} className='input-icon mx-2'/>
          <input
            className='input-field'
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Contraseña'
          />
        </div>
        <div >
          <label>
            <input
              type="checkbox"
              className='mx-3'
            />
            Recordar mi contraseña
          </label>
        </div>
        <button className='m-3' type="button" id='buttonLogin' onClick={handleSubmit}>LOGIN</button>
      </form> 
      <hr className="separador"/>
      <p className='text-center' id='letras'>O inicia sesión con:</p>
      <div className='d-flex justify-content-between'>
        <button className='socialButton small' type="button"><FaFacebook size={20} color="#3b5998" className='m-2'/>Facebook</button>
        <button className='socialButton small' type="button"><SiGoogle size={20} color="#db4a39" className='m-2'/> Google</button>
      </div>
      <p className='mt-3 small text-center'><Link to="/register" className="no-link-style">¿No tienes cuenta? Registrate</Link></p>
    </div>
  );
};

export default Login;
