/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// CSS
import './login.css'
//COMPONENTES
import Input from '../../input/input.jsx'
import Button from '../../button/button.jsx'
import { useNameChange, usePasswordChange, useTogglePassword, useLoginClick } from '../../../utils/login';
//ASSETS
import gif from '../../../assets/Images/hamb.gif'
import hide from '../../../assets/Images/hide.png'
import show from '../../../assets/Images/show.png'


export default function Login() {
  const { name, handleNameChange } = useNameChange();
  const { password, handlePasswordChange } = usePasswordChange();
  const { showPassword, togglePasswordVisibility, getPasswordInputType } = useTogglePassword();
  const { handleLoginClick } = useLoginClick();
  
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
          <div className='password'>
            <Input 
              type={getPasswordInputType()} 
              placeholder='*************' 
              value={password} 
              onChange={handlePasswordChange} 
              label='CONTRASEÑA:' 
              classInputLabel='labels'
              classInput='inputs'
              classContainer='containerInput'
            />
            <img 
              src={showPassword ? hide : show} 
              className="togglePassword"
              onClick={togglePasswordVisibility}
            />
          </div>
          <Button label="ENTRAR" onClick={handleLoginClick} classButton='buttonEnter'/>
        </div>
         <img src={gif} className="gif" alt="gif" />
      </div>
    </>
  )
}