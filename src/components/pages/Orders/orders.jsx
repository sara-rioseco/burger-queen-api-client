/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// CSS
import './orders.css'
//COMPONENTES
import Button from '../../button/button.jsx';
//ASSETS
import Out from '../../../assets/Images/out.png'
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'

export default function Orders() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const [showOrdersTable, setShowOrdersTable] = useState(false);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Verificar si hay un accessToken antes de hacer la solicitud
    if (!token) {
      // Redirigir al usuario al inicio de sesión si no hay un accessToken
      navigate('/login');
      return;
    }

      try {
        const response = await axios.get('http://localhost:8080/orders', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setOrdersData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [navigate, token]);

  const getProductsList = (products) => {
    return products.map((item) => item.product.name).join(', ');
  };

  const getTotalOrder = (prices) => {
    return prices.reduce((total, item) => total + item.product.price, 0);
  };

  const handleMenuClick = () => {
    setShowOrdersTable(true);
  };

  return (
    <>
      <div className='container'>
      <Button label='MENU' onClick={handleMenuClick} classButton='buttonMenu'/>
        {showOrdersTable && (
          <div className='orders'>
            <table className='orders-table'>
              <thead>
                <tr>
                <th className="tableHeader">ID</th>
                  <th className="tableHeader">CLIENTE</th>
                  <th className="tableHeader">PEDIDO</th>
                  <th className="tableHeader">ESTADO</th>
                  <th className="tableHeader">TOTAL</th>
                  <th className="tableHeader">EDITAR</th>
                  <th className="tableHeader">ELIMINAR</th>
                  <th className="tableHeader">ENTREGADO</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.client}</td>
                    <td>{getProductsList(order.products)}</td>
                    <td>{order.status}</td>
                    <td>${getTotalOrder(order.products)}</td>
                    <td className='buttonsTable'><img src={Edit} className="edit" alt="buttonEdit" /></td>
                    <td className='buttonsTable'><img src={Delete} className="delete" alt="buttonDelete" /></td>
                    <td className='buttonsTable'><img src={Check} className="check" alt="buttonCheck" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <img src={Out} className="out" alt="buttonOut" />
      </div>
    </>
  );
}