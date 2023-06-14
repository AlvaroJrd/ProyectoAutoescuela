import React, { useState } from 'react';
import './header.css';
import { IoMdMenu } from 'react-icons/io';
import { FaSignOutAlt, FaHome, FaTimes, FaUser, FaFileSignature, FaHammer } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const storedUserData = localStorage.getItem('datosUsuario');
  const datosUsuario = storedUserData ? JSON.parse(storedUserData) : null;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const navItems = datosUsuario.dni === 'admin' ? 
  [
    {
      title: 'Inicio',
      path: '/inicio',
      icon: <FaHome size={25} />,
      cName: 'nav-text'
    },
    {
      title: 'Tests',
      path: '/seleccionTest',
      icon: <FaFileSignature size={25} />,
      cName: 'nav-text'
    },
    {
      title: 'Perfil',
      path: '/perfil',
      icon: <FaUser size={25} />,
      cName: 'nav-text'
    },
    {
      title: 'Panel administrativo',
      path: '/panelAdmin',
      icon: <FaHammer size={25} />,
      cName: 'nav-text'
    }
  ] 
  :
  [
    {
      title: 'Inicio',
      path: '/inicio',
      icon: <FaHome size={25} />,
      cName: 'nav-text'
    },
    {
      title: 'Tests',
      path: '/seleccionTest',
      icon: <FaFileSignature size={25} />,
      cName: 'nav-text'
    },
    {
      title: 'Perfil',
      path: '/perfil',
      icon: <FaUser size={25} />,
      cName: 'nav-text'
    }
  ] ;

  const cerrarSesion = () => {
    localStorage.setItem('datosUsuario', JSON.stringify(null));
  }

  return (
    <header>
      <div className="left">
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <IoMdMenu className='menuButton' size={40} onClick={showSidebar}/>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items px-2 py-1' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <FaTimes size={40} className='menuButton'/>
              </Link>
            </li>
            {navItems.map((item, index) => {
              return (                 
                  <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="center">
        <h1>Test Ferrari</h1>
      </div>
      <div className="right">
      <Link to="/" className="no-link-style"><FaSignOutAlt size={30} onClick={cerrarSesion}/></Link>
      </div>
    </header>
  );
};

export default Header;