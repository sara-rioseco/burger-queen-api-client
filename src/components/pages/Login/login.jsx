/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css'
import gif from '../../../assets/Images/hamb.gif'
import Input from '../../input/input.jsx'
import Button from '../../button/button.jsx'

export default function Login() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value)
    console.log('hola CAMBIO NAME')
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value)
    console.log('hola CAMBIO PASSWORD')
  };

  const handleClick = () => {
    console.log('Hola ENTRAR');
  };

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