/* eslint-disable no-unused-vars */
import React from 'react';
// Import our custom CSS
import '../../../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// CSS
import './menu.css'
// COMPONENTS
import Button from '../../button/button.jsx';
import Switch from '../../switch/switch';
import LogoutButton from '../../logoutButton/logoutButton';
// ASSETS
import Delete from '../../../assets/Images/borrar.png'
import Add from '../../../assets/Images/add.png'
import Remove from '../../../assets/Images/remove.png'
import { MenuLogic } from '../../../utils/menu';

export default function Menu() {
  const {
    navigate,
    token,
    userId,
    showMenu,
    productsData,
    cartData,
    setCartData,
    breakfastProducts,
    lunchProducts,
    handleClickOrders,
    handleClickDesayuno,
    handleClickAlmuerzo,
    handleClickProduct,
    handleCountProducts,
    handleClickAdd,
    handleClickRemove,
    handleClickDelete,
    handleClickKitchen
  } = MenuLogic();

// =========== RENDERIZADO ===========
  return (
    <>
      <div className='menu-container'>
        <nav className='nav-bar'>
          <Button label='PEDIDOS' onClick={handleClickOrders} classButton='buttonMenu'/> 
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary" onClick={handleClickDesayuno}>DESAYUNO</button>
            <button type="button" className="btn btn-primary" onClick={handleClickAlmuerzo}>ALMUERZO Y CENA</button>
          </div>
        </nav>
        {showMenu && (
          <div className='products-grid'>
            {breakfastProducts.map(product => (
              <div key={product.id} className='product'> 
                <div className='image-content'><img src={product.image} alt={product.name} className='image' onClick={() => {
                  handleClickProduct(product);
                  }}/></div>
                <div className='text-content' onClick={() => {
                  handleClickProduct(product);
                  }}>
                  <div className='product-name'>{product.name}</div>
                  <div className='product-price'>${product.price}</div>
                </div>
              </div>
            ))}
            <div className='logout-button'><LogoutButton /></div>
          </div>
        )}
        {!showMenu && (
          <div className='products-grid'>
            {lunchProducts.map(product => (
              <div key={product.id} className='product'> 
                <div className='image-content'><img src={product.image} alt={product.name} className='image'  onClick={() => {
                  handleClickProduct(product);
                  }}/></div>
                <div className='text-content'  onClick={() => {
                  handleClickProduct(product);
                  }}>
                  <div className='product-name'>{product.name}</div>
                  <div className='product-price'>${product.price}</div>
                </div>
              </div>
            ))}
            <div className='logout-button'><LogoutButton /></div>
          </div>
        )}
      </div>
      <div className='cart-section'>
        <div className='cart-text'>CLIENTE:</div>
        <div><input className='cart-input' type='text' placeholder='Escribe aquí'></input></div>
        <div className='cart-text'>MESA:</div>
        <div><input className='cart-input' type='text' pattern="^[0-9]+$" maxLength="2" placeholder='Escribe aquí'></input></div>
        <table className='cart-table'>
          <thead>
            <tr key='head' className="table-head">
              <th className="table-title" colSpan='4'>CARRITO</th>
            </tr>
          </thead>
          <tbody>
            {cartData && cartData.map(product => {
              <tr key={product.id}>
                <td className='table-body'>{product.name}</td>
                <td className='table-count'><img src={Remove} alt='remove-button' className='action-button' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}{() => {handleCountProducts(product)}}{'\u00A0'}{'\u00A0'}<img src={Add} alt='add-button' className='action-button' onClick={handleClickAdd}/></td>
                <td className='table-number'>${product.price}</td>
                <td className='table-number'><img src={Delete} alt='delete-button' className='action-button' onClick={handleClickDelete}/></td>
              </tr>
            })}  
          </tbody>
          <tfoot>
            <tr key='foot' className="table-footer">
              <td className='table-end'> Total : </td>
              <td className='table-body'> </td>
                <td className='table-number'>$ 0</td>
              <td className='table-body'> </td>
            </tr>
          </tfoot>
        </table>
        <Button label='ENVIAR A COCINA' onClick={handleClickKitchen} classButton='buttonMenu'/>
      </div>

    </>
  )
}