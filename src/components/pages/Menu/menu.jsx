/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// CSS
import './menu.css'
// COMPONENTS
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton';
import ApiRequest from '../../../services/apiRequest';
// ASSETS
import Out from '../../../assets/Images/out.png'
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'
import Add from '../../../assets/Images/add.png'
import Remove from '../../../assets/Images/remove.png'

export default function Menu() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [showMenu, setShowMenu] = useState('Desayuno');
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    ApiRequest({
      url: 'http://localhost:8080/products',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const Products = response.data
      setProductsData(Products);
    }).catch((error) => {
      console.error(error);
    });
  }, [navigate, token, userId]);

  const breakfastProducts = productsData.filter(product => product.type === 'Desayuno');
  const lunchProducts = productsData.filter(product => product.type === 'Almuerzo');

  const handleClickBreakfast = () => {
    setShowMenu('Desayuno');
  };

  const handleClickLunch = () => {
    setShowMenu('Almuerzo');
  };

  const handleClickProduct = () => {
    console.log('Agregaste un producto al carrito')
  };
  
  const handleClickAdd = () => {
    console.log('Agregaste una unidad del producto')
  };

  const handleClickRemove = () => {
    console.log('Eliminaste una unidad del producto')
  };

  const handleClickDelete = () => {
    console.log('Eliminaste un producto del carrito')
  }

  const handleClickKitchen = () => {
    console.log('Has enviado la orden a cocina')
  }


  return (
    <>
      <div className='container'>
        <nav className='nav-bar'>
          <Button label='DESAYUNO' onClick={handleClickBreakfast} classButton='buttonMenu'/> 
          <Button label='ALMUERZO Y CENA' onClick={handleClickLunch} classButton='buttonMenu'/>
        </nav>
        {showMenu === 'Desayuno' && (
          <div className='products-grid'>
            {breakfastProducts.map(product => (
              <div key={product.id} className='product'> 
                <div className='image-content'><img src={product.image} alt={product.name} className='image' onClick={handleClickProduct}/></div>
                <div className='text-content'onClick={handleClickProduct}>
                  <div className='product-name'>{product.name}</div>
                  <div className='product-price'>${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showMenu === 'Almuerzo' && (
          <div className='products-grid'>
            {lunchProducts.map(product => (
              <div key={product.id} className='product'> 
                <div className='image-content'><img src={product.image} alt={product.name} className='image' onClick={handleClickProduct}/></div>
                <div className='text-content' onClick={handleClickProduct}>
                  <div className='product-name'>{product.name}</div>
                  <div className='product-price'>${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='cart-section'>
        <div className='cart-text'>CLIENTE:</div>
        <div><input className='cart-input' type='text' placeholder='Escribe aquí'></input></div>
        <div className='cart-text'>MESA:</div>
        <div><input className='cart-input' type='text' pattern="\d*" maxLength="2" placeholder='Escribe aquí'></input></div>
        <table className='cart-table'>
          <thead>
            <tr key='head' className="table-head">
              <th className="table-title" colSpan='4'>CARRITO</th>
            </tr>
          </thead>
          <tbody>
            <tr key='body1'>
              <td className='table-body'> Producto 1</td>
              <td className='table-body'> <img src={Remove} alt='delete-button' className='delete' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}5{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='delete' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 500</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='delete' onClick={handleClickDelete}/></td>
            </tr>
            <tr key='body2'>
              <td className='table-body'> Producto 2</td>
              <td className='table-body'> <img src={Remove} alt='delete-button' className='delete' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}1{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='delete' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 1000</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='delete' onClick={handleClickDelete}/></td>
            </tr>
            <tr key='body3'>
              <td className='table-body'> Producto 3</td>
              <td className='table-body'> <img src={Remove} alt='delete-button' className='delete' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}2{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='delete' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 500</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='delete' onClick={handleClickDelete}/></td>
            </tr>
            <tr key='body4'>
              <td className='table-body'> Producto 4</td> 
              <td className='table-body'> <img src={Remove} alt='delete-button' className='delete' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}1{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='delete' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 2000</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='delete' onClick={handleClickDelete}/></td>
            </tr>
          </tbody>
          <tfoot>
            <tr key='foot' className="table-footer">
              <td className='table-end'> Total : </td>
              <td className='table-body'> </td>
              <td className='table-number'>$ 4000</td>
              <td className='table-body'> </td>
            </tr>
          </tfoot>
        </table>
        <Button label='ENVIAR A COCINA' onClick={handleClickKitchen} classButton='buttonMenu'/>
      </div>
    </>
  )
}