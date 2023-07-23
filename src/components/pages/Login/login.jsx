/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
// CSS
import './login.css'
//COMPONENTES
import Input from '../../input/input.jsx'
import Button from '../../button/button.jsx'
//ASSETS
import gif from '../../../assets/Images/hamb.gif'


export default function Login() {
  // ESTADOS
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // CONTROLADORES DE EVENTOS
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('https://burger-api-mock.onrender.com/login', {
        email: name,
        password: password,
      });
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // RENDERIZADO
  return (
    <>
      <div className='login'>
        <div className='form'>
          <h2 className='title'>INICIAR SESIÓN</h2>
          <div className='line'></div>
          <Input 
            type='text' 
            placeholder='Escribe aquí' 
            value={name} 
            onChange={handleNameChange} 
            label='NOMBRE:' 
            classInputLabel='labels'
            classInput='inputs'
          />
          <Input 
            type='text' 
            placeholder='*************' 
            value={password} 
            onChange={handlePasswordChange} 
            label='CONTRASEÑA:' 
            classInputLabel='labels'
            classInput='inputs'
            classContainer='containerInput'
          />
          <Button label="ENTRAR" onClick={handleClick} classButton='buttonEnter'/>
        </div>
         <img src={gif} className="logo" alt="img logo" />
      </div>
    </>
  )
}