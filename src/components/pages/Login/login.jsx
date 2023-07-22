/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css'
import gif from '../../../assets/Images/hamb.gif'
import Input from '../../input/input.jsx'

export default function Login() {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
    console.log('hola CAMBIO')
  };

  return (
    <>
      <div className='login'>
        <div className='form'>
          <Input 
            type='text' 
            placeholder='Escribe aquí' 
            value={inputValue} 
            onChange={handleInputChange} 
            label='NOMBRE:' 
            classInputLabel='labels'
            classInput='inputs'
            classContainer='containerInput'
          />
          <Input 
            type='text' 
            placeholder='*************' 
            value={inputValue} 
            onChange={handleInputChange} 
            label='CONTRASEÑA:' 
            classInputLabel='labels'
            classInput='inputs'
            classContainer='containerInput'
          />
        </div>
         <img src={gif} className="logo" alt="img logo" />
      </div>
    </>
  )
}