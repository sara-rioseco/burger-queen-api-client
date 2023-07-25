/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// CSS
import './menu.css'
// COMPONENTS
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'
import { menuLogic } from '../../../utils/menu.jsx'
import { Services } from '../../../utils/services.jsx';
// ASSETS
import Out from '../../../assets/Images/out.png'
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'

export default function Menu() {
  const {
    getTokenAdmin,
    getTokenWaiter,
    getTokenChef
  } = Services();

  const { getProductImg } = menuLogic();

  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    getTokenWaiter()
  };

  return (
    <>
      <div className='container'>
        <nav className='nav-bar'>
          <Button label='DESAYUNO' onClick={handleClick} classButton='buttonMenu'/> 
          <Button label='ALMUERZO Y CENA' onClick={handleClick} classButton='buttonMenu'/>
        </nav>
        <div className='products-grid'>

        </div>
      </div>
    </>
  )
}