import React, { useEffect, useState } from 'react';
import './test.css';
import axios from "axios";
import Header from '../header/header';
import Footer from '../footer/footer';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Test = () => {
  document.body.style = 'background: #fff6eb;';
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState({});
  const [selecciones, setSelecciones] = useState([]);
  const [correctas, setCorrectas] = useState([]);
  const [respuestasFallidas, setRespuestasFallidas] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalFinal, setModalFinal] = useState(false);
  const [sinResponder, setSinResponder] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const navigate = useNavigate();
  const storedTestData = localStorage.getItem('test');
  const test = storedTestData ? JSON.parse(storedTestData) : null;
  const storedUserData = localStorage.getItem('datosUsuario');
  const datosUsuario = storedUserData ? JSON.parse(storedUserData) : null;
  

  const toggleModal = () => {
    setModal(false);
  };

  const toggleModalFinal = () => {
    setModalFinal(false);
  };

  useEffect(() => {
    axios
    .get("http://localhost:5000/preguntas/idTest/?test="+test._id)
    .then((response) => {
      if (response.data != null) {
        setPreguntas(response.data);
        setPreguntaActual((prevState) => ({
          ...response.data[0],
          numero: 1
        }));

        const buttonsContainer = document.getElementById('buttonsContainer');
        buttonsContainer.innerHTML = '';

        for (let i = 1; i <= test.numero_preguntas; i++) {
          const button = document.createElement("button");
          if(i === 1){
            button.classList = "m-2 cuadrado preguntaActual";
          } else {
            button.classList = "m-2 cuadrado";
          }
          button.textContent = i;
          button.id = i;
          button.addEventListener("click", () => {
            setPreguntaActual((prevState) => ({
              ...response.data[i-1],
              numero: i
            }));

          });
          buttonsContainer.appendChild(button);
        }
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });

  }, []);

  useEffect(() => {
    if(!finalizado){
      if(document.getElementsByClassName('preguntaActual').length !== 0){
        if(document.getElementsByClassName('preguntaActual')[0].className.includes('preguntaContestada'))
        {
          document.getElementsByClassName('preguntaActual')[0].className = 'm-2 cuadrado preguntaContestada';
        } else {
          document.getElementsByClassName('preguntaActual')[0].className = 'm-2 cuadrado';
        }
      document.getElementById(preguntaActual.numero).className += ' preguntaActual';
    }

      if(document.getElementsByClassName('respuestaActual').length !== 0){
        document.getElementsByClassName('respuestaActual')[0].className = 'opcion mx-2';
      }

      const objetoEncontrado = selecciones.find(objeto => objeto.numeroTest === preguntaActual.numero);

      if(objetoEncontrado !== undefined){
        document.getElementById(objetoEncontrado.respuesta).className += ' respuestaActual';
        document.getElementById(preguntaActual.numero).className += ' preguntaContestada';

      }
    } else {

      if(document.getElementsByClassName('respuestaActual').length !== 0){
        document.getElementsByClassName('respuestaActual')[0].className = 'opcion mx-2';
      }

      if(document.getElementsByClassName('respuestaCorrecta').length !== 0 ){
        document.getElementsByClassName('respuestaCorrecta')[0].className = 'opcion mx-2';
      } 
      
      if(document.getElementsByClassName('respuestaIncorrecta').length !== 0){
        document.getElementsByClassName('respuestaIncorrecta')[0].className = 'opcion mx-2';
      }

      const objetoEncontrado = selecciones.find(objeto => objeto.numeroTest === preguntaActual.numero);
      const corr = correctas.find(objeto => objeto.numeroTest === preguntaActual.numero);

      if(objetoEncontrado !== undefined){
        if(corr.correcta === true){
          document.getElementById(objetoEncontrado.respuesta).className += ' respuestaCorrecta';
        } else {
          document.getElementById(objetoEncontrado.respuesta).className += ' respuestaIncorrecta';
          document.getElementById(corr.letra).className += ' respuestaCorrecta';

        }
      } else {
        document.getElementById(corr.letra).className += ' respuestaCorrecta';

      }
      
    }
  
    document.getElementById('sig').disabled = preguntaActual.numero === test.numero_preguntas ? true : false;
    document.getElementById('ant').disabled = preguntaActual.numero === 1 ? true : false;

  }, [preguntaActual]);

  useEffect(() => {
    if(!finalizado){
      if(document.getElementsByClassName('respuestaActual').length !== 0){
        document.getElementsByClassName('respuestaActual')[0].className = 'opcion mx-2';
      }

      const objetoEncontrado = selecciones.find(objeto => objeto.numeroTest === preguntaActual.numero);

      if(objetoEncontrado !== undefined){
        document.getElementById(objetoEncontrado.respuesta).className = 'opcion mx-2 respuestaActual';
      }
    }
  }, [selecciones]);

  const changeOption = (e) => {
    if(!finalizado){
      if(document.getElementsByClassName('respuestaActual').length !== 0){
        document.getElementsByClassName('respuestaActual')[0].className = 'opcion mx-2';
      }

      e.target.className += ' respuestaActual';

      document.getElementsByClassName('preguntaActual')[0].className += ' preguntaContestada';

      if(selecciones.find(elemento => elemento.numeroTest === preguntaActual.numero)){
        selecciones[selecciones.indexOf(selecciones.find(elemento => elemento.numeroTest === preguntaActual.numero))] = {numeroTest: preguntaActual.numero, respuesta: e.target.value};
      } else {
        setSelecciones((prevArray) => prevArray.concat({numeroTest: preguntaActual.numero, respuesta: e.target.value}));
      }
    }
  }

  const siguientePregunta = () => {
    if(!finalizado){
      if(document.getElementById(preguntaActual.numero).className.includes('preguntaContestada')){
        document.getElementById(preguntaActual.numero).className = 'm-2 cuadrado preguntaContestada';
      } else {
        document.getElementById(preguntaActual.numero).className = 'm-2 cuadrado';
      }

      document.getElementById(preguntaActual.numero+1).className = 'm-2 cuadrado preguntaActual';
    }
    setPreguntaActual(
      (prevState) => ({
        ...preguntas[preguntaActual.numero],
        numero: preguntaActual.numero+1
      }));
  }

  const anteriorPregunta = () => {
    if(!finalizado){
      if(document.getElementById(preguntaActual.numero).className.includes('preguntaContestada')){
        document.getElementById(preguntaActual.numero).className = 'm-2 cuadrado preguntaContestada';
      } else {
        document.getElementById(preguntaActual.numero).className = 'm-2 cuadrado';
      }

      document.getElementById(preguntaActual.numero-1).className = 'm-2 cuadrado preguntaActual';
    }
    setPreguntaActual(
      (prevState) => ({
        ...preguntas[preguntaActual.numero-2],
        numero: preguntaActual.numero-1
      }));

  }

  const finalizarTest = () => {
    let cont = 0;
    for (let i = 1; i <= test.numero_preguntas; i++) {
      let resp = selecciones.find(objeto => objeto.numeroTest === i);
      if(resp === undefined){
        cont++
      } 
    }

    setSinResponder(cont);
    setModal(true);
    
  }

  const comprobarRespuestas = () => {
    let cont = 0;
    for (let i = 1; i <= test.numero_preguntas; i++) {
      let resp = selecciones.find(objeto => objeto.numeroTest === i);
      if(resp !== undefined){
        if(resp.respuesta === preguntas[i-1].correcta){
          setCorrectas((prevArray) => prevArray.concat({numeroTest: i, correcta: true, letra: preguntas[i-1].correcta}));
          
          document.getElementById(i).className += ' correcta';
        }else{
          setCorrectas((prevArray) => prevArray.concat({numeroTest: i, correcta: false, letra: preguntas[i-1].correcta}));
          document.getElementById(i).className += ' incorrecta';
          cont++;
        }
      } else {
          setCorrectas((prevArray) => prevArray.concat({numeroTest: i, correcta: false, letra:preguntas[i-1].correcta}));
          document.getElementById(i).className += ' incorrecta';
          cont++;
      }
    }
    setRespuestasFallidas(cont);
    setPreguntaActual(
      (prevState) => ({
        ...preguntas[0],
        numero: 1
      }));
    setFinalizado(true);
    setModal(false);
    setModalFinal(true);

    axios.get('http://localhost:5000/progreso/usuario/?idUser='+datosUsuario._id+'&idTest='+test._id)
      .then((response) => {
        if(response.data != null){
          axios
            .put("http://localhost:5000/progreso/"+response.data._id, {
              dni: datosUsuario._id,
              test: test._id,
              numero_fallos: cont
            })
            .then(() => {
              console.log("Solicitud UPDATE exitosa");
            })
            .catch((error) => {
              console.error("Error al obtener los datos:", error.response.data);
            });
        } else{
          axios
            .post("http://localhost:5000/progreso", {
              dni: datosUsuario._id,
              test: test._id,
              numero_fallos: cont
            })
            .then(() => {
              console.log("Solicitud POST exitosa");
            })
            .catch((error) => {
              console.error("Error al obtener los datos:", error.response.data);
            });
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });

    
  }

  const volverSeleccion = () => {
    navigate("/seleccionTest");
  }

  return (
    <div>
        <Header />
        <div className="container">
          <div id="buttonsContainer" className='pt-2'>
          </div>
          <div className='row mt-3'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png" alt="Girl in a jacket" className='mt-3 imagen'/>
            <div className='pregunta col px-5 row'>
              <div className='mt-4 row'>
                <p className='question'>{preguntaActual.numero}.- {preguntaActual.texto}</p>
                <p className='px-4 answer'><button onClick={changeOption} type='button' id="A" value="A" className='opcion mx-2'>A</button> {preguntaActual.respuesta1}</p>
                <p className='px-4 answer'><button onClick={changeOption} type='button' id="B" value="B" className='opcion mx-2'>B</button> {preguntaActual.respuesta2}</p>
                <p className='px-4 answer'><button onClick={changeOption} type='button' id="C" value="C" className='opcion mx-2'>C</button> {preguntaActual.respuesta3}</p>
                <p className='px-4 answer'><button onClick={changeOption} type='button' id="D" value="D" className='opcion mx-2'>D</button> {preguntaActual.respuesta4}</p>
              </div>
              <div className='d-flex justify-content-between mt-5 align-self-end'>
                <button id="ant" onClick={anteriorPregunta} className='buttonsControl col-4 p-2'>◀ Anterior</button>
                {!finalizado && (<button onClick={finalizarTest} className='buttonsControl col-3'>Finalizar</button>)}
                {finalizado && (<button onClick={volverSeleccion} className='buttonsControl col-3'>Volver a los tests</button>)}
                <button id="sig" onClick={siguientePregunta} className='buttonsControl col-4'>Siguiente ▶</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {modal && (
        <div className="popup">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popup-content">
            <h2 className='titulo'>¿Está seguro?</h2>
            <p className='p-4 titulo'>
              ¿Está seguro que desea dar por finalizado el test?
              {sinResponder !== 0 && ( <> <br/> Usted tiene {sinResponder} preguntas sin responder </>)}
            </p>
            <div className='d-flex justify-content-between'>
              <button className='btn btn-secondary col-2' onClick={comprobarRespuestas}>
                Si
              </button>
              <button className='btn btn-danger col-2' onClick={toggleModal}>
                No
              </button>
            </div>
          </div>
        </div>
        )}

        {modalFinal && (
        <div className="popup">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popup-content">
            <h2 className='titulo'>
              {respuestasFallidas <= 3 && ( <> Aprobado </>)}
              {respuestasFallidas > 3 && ( <> Suspenso </>)}
            </h2>
            <p className='p-4 titulo'>
              {respuestasFallidas <= 3 && ( <> ¡Felicidades! Has aprobado. </>)}
              {respuestasFallidas > 3 && ( <> Has suspendido. La proxima vez será. </>)}
              <br/>Errores: {respuestasFallidas}
            </p>
            <button className="close-popup" onClick={toggleModalFinal}>
              <FaTimes size={20} />
            </button>
          </div>
        </div>
        )}
    </div>
  );
};

export default Test;