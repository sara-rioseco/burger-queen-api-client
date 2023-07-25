/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// CSS
import './menu.css'
// COMPONENTS
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'
import { menuLogic } from '../../../utils/menu.jsx'
// ASSETS
import Out from '../../../assets/Images/out.png'
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'

export default function Menu() {
  const { getProductImg} = menuLogic();

  const [showMenu, setShowMenu] = useState('Desayuno');
  const handleClick = () => {
    console.log('Hola menú');
  };

  return (
    <>
      <div className='container'>
        <Button label='DESAYUNO' onClick={handleClick} classButton='buttonMenu'/> 
        <Button label='ALMUERZO Y CENA' onClick={handleClick} classButton='buttonMenu'/>
      </div>
    </>
  )
}