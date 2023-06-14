import React, { useEffect, useState } from "react";
import "./seleccionTest.css";
import axios from "axios";
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';

const SeleccionTest = () => {
  document.body.style = 'background: #fff6eb;';
  const storedUserData = localStorage.getItem('datosUsuario');
  const datosUsuario = storedUserData ? JSON.parse(storedUserData) : null;
  const [progreso, setProgreso] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/progreso/idUser/?idUser="+datosUsuario._id)
      .then((progreso) => {
        console.log(progreso.data);
        axios
        .get("http://localhost:5000/tests/tipo/?tipo="+datosUsuario.tipo_carnet)
        .then((response) => {
          if (response.data != null) {
            const tabla = document.getElementById('tablaTests');
            tabla.innerHTML = '';
            const cuerpo = tabla.createTBody();

            const encabezado = tabla.createTHead();
            const filaEncabezado = encabezado.insertRow();

            const encabezado1 = document.createElement("th");
            encabezado1.innerHTML = "Test";
            filaEncabezado.appendChild(encabezado1);

            const encabezado2 = document.createElement("th");
            encabezado2.innerHTML = "Realizado";
            filaEncabezado.appendChild(encabezado2);

            const encabezado3 = document.createElement("th");
            encabezado3.innerHTML = "Nº Fallos";
            filaEncabezado.appendChild(encabezado3);

            const encabezado4 = document.createElement("th");
            encabezado4.innerHTML = "Estado";
            filaEncabezado.appendChild(encabezado4);

            // Crea las filas y celdas de la tabla
            for (let i = 0; i < 5; i++) {
                if(response.data[i] != null){
                    const fila = cuerpo.insertRow();

                    const celda1 = fila.insertCell();
                    celda1.innerHTML = '';
                    
                    const button = document.createElement("button");
                    button.textContent = 'Test '+response.data[i].numero;
                    button.id = 'buttonTest';
                    button.addEventListener("click", () => {
                        localStorage.setItem('test', JSON.stringify(response.data[i]));
                        navigate('/test');
                    });
                    celda1.appendChild(button);

                    const celda2 = fila.insertCell();
                    celda2.innerHTML = progreso.data[i] === undefined ? 'No' : 'Si';

                    const celda3 = fila.insertCell();
                    celda3.innerHTML = progreso.data[i] === undefined ? '-' : progreso.data[i].numero_fallos;

                    const celda4 = fila.insertCell();
                    celda4.innerHTML = progreso.data[i] === undefined ? '-' : (progreso.data[i].numero_fallos <= 3 ? 'Aprovado' : 'Suspenso');

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

                }
            }
          }
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });

      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });

    
  }, []);

  
  
  return (
    <div>
    <Header />
    <div className="container">
        <h1 className='titulo py-3'>¿Qué test realizarás?</h1>
        <div className='mx-5'>
            <h3>Listado de Tests</h3>
        </div>
        <table id="tablaTests" className='tablaTests mx-5 mt-3'>
        </table>
    </div>
    <Footer />
    </div>
  );
};

export default SeleccionTest;