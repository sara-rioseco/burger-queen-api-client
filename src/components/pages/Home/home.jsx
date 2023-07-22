/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './home.css';
import logo from '../../../assets/Images/logo.png';
import Button from '../../button/button.jsx';
import { Redirect } from 'react-router-dom';

export default function Home() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleClick = () => {
    console.log('Hola HOME');
    setRedirectToLogin(true);
  };

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="INICIAR SESIÓN" onClick={handleClick} classButton="enter" />
      </div>
    </>
  );
}
