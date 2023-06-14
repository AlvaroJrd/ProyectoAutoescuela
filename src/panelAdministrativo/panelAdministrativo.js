import React, { useEffect, useState } from "react";
import "./panelAdministrativo.css";
import axios from "axios";
import Header from "../header/header";
import Footer from "../footer/footer";

const PanelAdministrativo = () => {
  document.body.style = "background: #fff6eb;";
  const [modal, setModal] = useState(false);
  const [celdas, setCeldas] = useState([]);

  const toggleModal = () => {
    setModal(false);
  };

  useEffect(() => {
    axios
    .get("http://localhost:5000/users")
    .then((response) => {
      if (response.data != null) {
        console.log(response.data);

        const tabla = document.getElementById('tablaUsuarios');
        tabla.innerHTML = '';
        const cuerpo = tabla.createTBody();

        const encabezado = tabla.createTHead();
        const filaEncabezado = encabezado.insertRow();

        const encabezado1 = document.createElement("th");
        encabezado1.innerHTML = "Nombre completo";
        filaEncabezado.appendChild(encabezado1);

        const encabezado2 = document.createElement("th");
        encabezado2.innerHTML = "DNI";
        filaEncabezado.appendChild(encabezado2);

        const encabezado3 = document.createElement("th");
        encabezado3.innerHTML = "Correo";
        filaEncabezado.appendChild(encabezado3);

        const encabezado4 = document.createElement("th");
        encabezado4.innerHTML = "Tipo carnet";
        filaEncabezado.appendChild(encabezado4);

        const encabezado5 = document.createElement("th");
        encabezado5.innerHTML = "Test realizados";
        filaEncabezado.appendChild(encabezado5);

        const encabezado7 = document.createElement("th");
        encabezado7.innerHTML = "";
        filaEncabezado.appendChild(encabezado7);

        // Crea las filas y celdas de la tabla
        console.log();
        for (let i = 0; i < (response.data.length > 10 ? 10 :response.data.length); i++) {
          
            if(response.data[i] != null){
                if(response.data[i].dni !== 'admin'){
                  const fila = cuerpo.insertRow();

                const celda1 = fila.insertCell();
                celda1.innerHTML = response.data[i].nombre;

                const celda2 = fila.insertCell();
                celda2.innerHTML = response.data[i].dni;

                const celda3 = fila.insertCell();
                celda3.innerHTML = response.data[i].correo;

                const celda4 = fila.insertCell();
                celda4.innerHTML = response.data[i].tipo_carnet;

                const celda5 = fila.insertCell();
                celda5.innerHTML = response.data[i].test_realizados;

                const celda7 = fila.insertCell();
                celda7.innerHTML = '';
                    
                const button = document.createElement("button");
                button.textContent = 'Borrar';
                button.id = 'buttonDelete';
                button.className = 'btn btn-danger';
                button.addEventListener("click", () => {
                  setCeldas([response.data[i]._id, celda1, celda2, celda3, celda4, celda5, celda7]);
                  setModal(true);
                });

                celda7.appendChild(button);

                }
                
            } else {
                const fila = cuerpo.insertRow();
                fila.className = 'filaVacia';

                const celda1 = fila.insertCell();
                celda1.innerHTML = '';

                const celda2 = fila.insertCell();
                celda2.innerHTML = '';

                const celda3 = fila.insertCell();
                celda3.innerHTML = '';

                const celda4 = fila.insertCell();
                celda4.innerHTML = '';

                const celda5 = fila.insertCell();
                celda5.innerHTML = '';

                const celda7 = fila.insertCell();
                celda7.innerHTML = '';
            }
        }
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });

  }, []);

  const borrarUser = () => {
    console.log(celdas);
    axios
    .delete("http://localhost:5000/users/"+celdas[0])
    .then(() => {
      for(let i = 1; i < 7; i++){
        celdas[i].remove();
      }

      console.log("Solicitud DELETE exitosa");
      setModal(false);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error.response.data);
    });
  }

  const handleChange = (e) => {
    switch(e.target.value){
        case 'nombre':
            console.log('nombre');
            break;
        case 'dni':
            console.log('dni');
            break;
        case 'correo':
            console.log('correo');
            break;
        case 'tipoCarnet':
            console.log('tipoCarnet');
            break;
        case 'testRealizados':
            console.log('testRealizados');
            break;    
        default:
            break;
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="titulo py-3">Panel Administrativo</h1>
        <div className="mx-5 d-flex justify-content-between">
          <h3 className="col-9">Listado de Usuarios</h3>
          <div className="row col d-flex align-items-center">
            <label className="col">Ordenar por:</label>
            <select onChange={handleChange} className="col-7">
              <option value="nombre">Nombre completo</option>
              <option value="dni">DNI</option>
              <option value="correo">Correo</option>
              <option value="tipoCarnet">Tipo carnet</option>
              <option value="testRealizados">Test realizados</option>
            </select>
          </div>
        </div>
        <table id="tablaUsuarios" className="tablaUsuarios mx-5 mt-3">
        </table>
      </div>
      <Footer />

      {modal && (
        <div className="popup">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popup-content">
            <h2 className='titulo'>¿Está seguro?</h2>
            <p className='p-4 titulo'>
              ¿Está seguro que desea borrar el usuario seleccionado?
            </p>
            <div className='d-flex justify-content-between'>
              <button className='btn btn-secondary col-2' onClick={borrarUser}>
                Si
              </button>
              <button className='btn btn-danger col-2' onClick={toggleModal}>
                No
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default PanelAdministrativo;
