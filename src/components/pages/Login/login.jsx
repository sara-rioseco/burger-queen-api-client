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
import hide from '../../../assets/Images/hide.png'
import show from '../../../assets/Images/show.png'


export default function Login() {
  // ESTADOS
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // CONTROLADORES DE EVENTOS
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordInputType = () => {
    return showPassword ? 'text' : 'password';
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('https://burger-queen-api-mock-r47a.onrender.com/login', {
        email: name,
        password: password,
      });
      console.log(response);
      console.log(response.data);
      console.log(response.data.user);
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
          <Button label="ENTRAR" onClick={handleClick} classButton='buttonEnter'/>
        </div>
         <img src={gif} className="gif" alt="gif" />
      </div>
    </>
  )
}