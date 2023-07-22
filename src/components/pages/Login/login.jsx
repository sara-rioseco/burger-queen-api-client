/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css'
import gif from '../../../assets/Images/hamb.gif'
import Input from '../../input/input.jsx'
import Button from '../../button/button.jsx'

export default function Login() {

  const [inputValue, setInputValue] = useState('');

  const handleNameChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
    console.log('hola CAMBIO NAME')
  };

  const handlePasswordChange = (event) => {
    setInputValue(event.target.value);
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
          <Input 
            type='text' 
            placeholder='Escribe aquí' 
            value={inputValue} 
            onChange={handleNameChange} 
            label='NOMBRE:' 
            classInputLabel='labels'
            classInput='inputs'
          />
          <Input 
            type='text' 
            placeholder='*************' 
            value={inputValue} 
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