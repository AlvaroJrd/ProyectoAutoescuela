import React, { useEffect } from "react";
import "./panelAdministrativo.css";
import axios from "axios";
import Header from "../header/header";
import Footer from "../footer/footer";


const PanelAdministrativo = () => {
  document.body.style = "background: #fff6eb;";

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

        const encabezado6 = document.createElement("th");
        encabezado6.innerHTML = "";
        filaEncabezado.appendChild(encabezado6);

        const encabezado7 = document.createElement("th");
        encabezado7.innerHTML = "";
        filaEncabezado.appendChild(encabezado7);

        // Crea las filas y celdas de la tabla
        for (let i = 0; i < 8; i++) {
            if(response.data[i] != null){
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

                const celda6 = fila.insertCell();
                celda6.innerHTML = '<button id="buttonEdit" type="button" onClick={handleEdit}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="23" width="23" xmlns="http://www.w3.org/2000/svg"><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg></button>';

                const celda7 = fila.insertCell();
                celda7.className = 'px-2';
                celda7.innerHTML = '<button id="buttonDelete" type="button" onClick={handleDelete}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="23" width="23" xmlns="http://www.w3.org/2000/svg"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg></button>';
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

                const celda6 = fila.insertCell();
                celda6.innerHTML = '';

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

  const handleEdit = () => {
    
  }

  const handleDelete = () => {
    
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
    </div>
  );
};

export default PanelAdministrativo;
