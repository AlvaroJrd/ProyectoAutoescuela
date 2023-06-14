import React from 'react';
import './inicio.css';
import Header from '../header/header';
import Footer from '../footer/footer';

const Inicio = () => {
  document.body.style = 'background: #fff6eb;';
  // Recuperar los datos del usuario en cualquier parte de la aplicación
  const storedUserData = localStorage.getItem('datosUsuario');
  const datosUsuario = storedUserData ? JSON.parse(storedUserData) : null;

  return (
    <div>
        <Header />
        <div className="container">
          <h1 className='titulo pt-2'>Bienvenido {datosUsuario.nombre}</h1>
          <h4 className='titulo'>¿Qué vamos a hacer hoy?</h4>
          <div className="row">
            <div className="listaInicio test m-3 col-9">
              <div>
                <div className='px-3 encabezado'>
                  <h4>Un poco sobre nosotros</h4>
                </div>

                <div className='row'>
                  <div className='col-8'>
                    <p className='p-3'>
                    ¡Bienvenidos a nuestra autoescuela! Estamos comprometidos a ayudarte a alcanzar tus metas y obtener tu licencia de conducir. Sabemos que los exámenes pueden ser intimidantes, pero no te preocupes, ¡estamos aquí para guiarte en cada paso del camino!

                    Nuestros tests de conducción están diseñados para evaluar tus conocimientos teóricos y habilidades prácticas en la carretera. Con nuestro enfoque educativo integral, te prepararemos para que te sientas seguro y preparado cuando llegue el momento de enfrentar el examen oficial.
                    </p>
                  </div>
                  <div className='col-4'>
                    <img src="https://www.autoescuelallorens.com/server/Portal_0011981/img/blogposts/test-autoescuela-como-aprobar-el-examen-teorico-de-conducir_8593.jpg" alt="Girl in a jacket" className='w-100 my-1'/>
                  </div>
                </div>
              </div>
              <div className='mt-3'>
                <div className='px-3 encabezado'>
                  <h4>Clases</h4>
                </div>

                <div className='row'>
                  <div className='col-4'>
                    <ul className='links'>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=hoVrKLnf-Gc&t=2s&ab_channel=Formaci%C3%B3nTe%C3%B3ricaVial" target="_blank" rel="noopener noreferrer">Clase velocidades</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=-Bkf6lMkZbk&ab_channel=EDUCACI%C3%93NVIALF%C3%81CILYSENCILLA" target="_blank" rel="noopener noreferrer">Clase seguridad vial</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=kfMGaffhaBg&ab_channel=autoescuelacom" target="_blank" rel="noopener noreferrer">Clase señalizacion</a></li>
                    </ul>
                  </div>
                  <div className='col-4'>
                  {datosUsuario.tipo_carnet === 'B' && (
                    <ul className='links'>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=D7QFHjid6rg&t=1s&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase permiso B Tema 1</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=yGOoG9NCFBA&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase permiso B Tema 2 parte 1</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=56dR_JjuXLY&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase permiso B Tema 2 parte 2</a></li>
                    </ul>
                    )}
                  {datosUsuario.tipo_carnet === 'C' && (
                    <ul className='links'>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=29ts80H1ZtI&list=PLpJEaE79jkqSHUpgMW8u0e_sJU2qNMaq-&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase teorica permiso C parte 1</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=bMgyHrkgiIk&list=PLpJEaE79jkqSHUpgMW8u0e_sJU2qNMaq-&index=2&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase teorica permiso C parte 2</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=MiOE1dIXYw0&list=PLpJEaE79jkqSHUpgMW8u0e_sJU2qNMaq-&index=3&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase teorica permiso C parte 3</a></li>
                    </ul>
                  )}
                  {datosUsuario.tipo_carnet === 'A' && (
                    <ul className='links'>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=gDktJzVmS9I&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase teorica permiso A parte 1</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=aoh_0Ut8VUU&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase teorica permiso A parte 2</a></li>
                      <li className='mt-3'><a href="https://www.youtube.com/watch?v=v5I0-R8dGpA&ab_channel=JordiEscoladeConducci%C3%B3" target="_blank" rel="noopener noreferrer">Clase teorica permiso A parte 3</a></li>
                    </ul>
                  )}
                  </div>
                  <div className='col-4'>
                    <img src="https://autoescuelacarland.com/wp-content/uploads/2013/11/shutterstock_8995465-1504-x-1000-1200x480.jpg" alt="Girl in a jacket" className='w-100 my-3'/>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col mt-3 p-2 noticias">
              <h3>Noticias</h3>
              <div className='contenidoNoticias col p-4 py-2'>
                <div className='noticia p-2 row mb-2 '>
                  <h5>Choca un camion</h5>
                  <p>El pasado sabado chocó un camion de 1 tonelada en el puente direccion Cádiz...</p>
                </div>
                <div className='noticia p-2 row mb-2'>
                  <h5>Nuevos radares</h5>
                  <p>Con el cambio de politicas en la DGT, están planteandose poner...</p>
                </div>
                <div className='noticia p-2 row mb-2'>
                  <h5>Preguntas actuales</h5>
                  <p>Estas 15 preguntas están entrando ultimamente en los examenes de la...</p>
                </div>           
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default Inicio;
