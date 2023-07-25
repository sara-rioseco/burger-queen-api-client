/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './logoutButton.css'

import Out from '../../assets/Images/out.png'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el localStorage eliminando el token y el userId
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    // Redirigir al usuario a la ruta inicial
    navigate('/');
  };

  return (
    <img
      src={Out}
      alt="Cerrar sesión"
      onClick={handleLogout}
      className="out"
    />
  );
};

export default LogoutButton;
