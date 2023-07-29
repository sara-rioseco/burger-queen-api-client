/* eslint-disable no-unused-vars */
import React from 'react';

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
    breakfastProducts,
    lunchProducts,
    handleClickOrders,
    checkMenuState,
    handleClickProduct,
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
        <Switch label="menu" onChange={checkMenuState} />
        <div className="btn-group" role="group" aria-label="Basic example">
  <button type="button" className="btn btn-primary">DESAYUNO</button>
  <button type="button" className="btn btn-primary">ALMUERZO Y CENA</button>
</div>
        </nav>
        {showMenu && (
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
        {!showMenu && (
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
              <td className='table-count'> <img src={Remove} alt='delete-button' className='action-button' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}5{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='action-button' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 500</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='action-button' onClick={handleClickDelete}/></td>
            </tr>
            <tr key='body2'>
              <td className='table-body'> Producto 2</td>
              <td className='table-count'> <img src={Remove} alt='delete-button' className='action-button' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}1{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='action-button' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 1000</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='action-button' onClick={handleClickDelete}/></td>
            </tr>
            <tr key='body3'>
              <td className='table-body'> Producto 3</td>
              <td className='table-count'> <img src={Remove} alt='delete-button' className='action-button' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}2{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='action-button' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 500</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='action-button' onClick={handleClickDelete}/></td>
            </tr>
            <tr key='body4'>
              <td className='table-body'> Producto 4</td> 
              <td className='table-count'> <img src={Remove} alt='delete-button' className='action-button' onClick={handleClickRemove}/>{'\u00A0'}{'\u00A0'}1{'\u00A0'}{'\u00A0'}<img src={Add} alt='delete-button' className='action-button' onClick={handleClickAdd}/></td>
              <td className='table-number'> $ 2000</td>
              <td className='table-number'><img src={Delete} alt='delete-button' className='action-button' onClick={handleClickDelete}/></td>
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