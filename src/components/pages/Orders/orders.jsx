/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CSS
import './orders.css'
//COMPONENTES
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton.jsx';
import ApiRequest from '../../../services/apiRequest.jsx';
import Modal from '../../modal/modal.jsx';
import Input from '../../input/input.jsx'
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'

export default function Orders() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [ordersData, setOrdersData] = useState([]);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOrderId, setModalOrderId] = useState(null);

  useEffect(() => {

    if (!token) {
      // Redirigir al usuario al inicio de sesión si no hay un accessToken
      navigate('/login');
      return;
    }

        ApiRequest({
          url: 'http://localhost:8080/orders',
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => {

        const filteredOrders = response.data.filter((order) => order.userId === Number(userId));

      setOrdersData(filteredOrders);
    })
    .catch((error) => {
      console.error(error);
      if (error.response.data === 'jwt expired' && error.response.status === 401) {
        console.error(error);
        navigate('/login');
      } else {
      console.error(error);
      error && navigate('/error-page');
      }
    });
}, [navigate, token, userId]);

  const getProductsList = (products) => {
    return products.map((item) => `${item.qty} ${item.product.name}`).join(', ');
  };

  const getTotalOrder = (prices) => {
    return prices.reduce((total, item) => total + item.qty * item.product.price, 0);
  };

  const handleMenuClick = () => {
    console.log('hola');
    navigate('/menu');
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Entregado' : 'green',
      'Listo en barra' : 'yellow',
      'En preparación' : '',
    }
    return statusColors[status];
  }

  const handleCheckClick = (orderId) => {
    const body = {
      "status": "Entregado"
    };

    ApiRequest({
      url: `http://localhost:8080/orders/${orderId}`,
      method: 'patch',
      body: body,
    })
    .then((response) => {
      console.log('Response from server status:', response.data);
      console.log(orderId);

      setOrdersData(prevOrders => {
        const updatedOrders = prevOrders.map(order => {
          if (order.id === orderId) {
            return { ...order, status: "Entregado" };
          }
          return order;
        });
        return updatedOrders;
      });
    })
    .catch((error) => {
      console.error(error);
      if (error.response.data === 'jwt expired' && error.response.status === 401) {
        console.error(error);
        navigate('/login');
      } else {
      console.error(error);
      error && navigate('/error-page');
      }
    });
  };

  const handleConfirmDeleteClick = (orderId) => {
    const orderDelete = ordersData.find(order => order.id === orderId);
    console.log('123',orderDelete);
    
    const body = orderDelete;

    ApiRequest({
          url: `http://localhost:8080/orders/${orderId}`,
          method: 'delete',
          body: body,
        })
        .then((response) => {
          console.log('Response from server delete:', response.data);
          console.log(orderId);

          setOrdersData(prevOrders => prevOrders.filter(order => order.id !== orderId));
          setModalOpenDelete(false);
        })
        .catch((error) => {
          console.error(error);
          if (error.response.data === 'jwt expired' && error.response.status === 401) {
            console.error(error);
            navigate('/login');
          } else {
          console.error(error);
          error && navigate('/error-page');
          }
        });
  }

  const handleOpenModalDelete = (orderId) => {
    setModalOrderId(orderId); // Establecer el orderId al hacer clic en el botón de eliminar
    setModalOpenDelete(true); // Abrir la modal
  }

  const handleCloseModal = () => {
    setModalOrderId(null); // Limpiar el orderId al cerrar la modal
    setModalOpenDelete(false);
    setModalOpenEdit(false); // Cerrar la modal
  };

  const handleOpenEditModal = (orderId) => {
    setModalOrderId(orderId); // Establecer el orderId al abrir la modal de edición
    setModalOpenEdit(true); // Abrir la modal de edición
  }

  const handleCloseEditModal = () => {
    setModalOrderId(null); // Limpiar el orderId al cerrar la modal de edición
    setModalOpenEdit(false); // Cerrar la modal de edición
  };


  return (
    <>
      <div className='containerOrders'>
      <Button label='MENU' onClick={handleMenuClick} classButton='buttonMenu'/>
          <div className='orders'>
            <table className='orders-table'>
              <thead>
                <tr>
                <th className="tableHeader">MESA</th>
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
                    <td>#{order.table}</td>
                    <td>{order.client}</td>
                    <td>{getProductsList(order.products)}</td>
                    <td className={getStatusColor(order.status)}>{order.status}</td>
                    <td>${getTotalOrder(order.products)}</td>
                    <td className='buttonsTable'><img src={Edit} className="edit" alt="buttonEdit" onClick={() => handleOpenEditModal(order.id)}/></td>
                    <td className='buttonsTable'><img src={Delete} className="delete" alt="buttonDelete" onClick={() => handleOpenModalDelete(order.id)}/></td>
                    <td className='buttonsTable'><img src={Check} className="check" alt="buttonCheck" onClick={() => handleCheckClick(order.id)}/></td>
                    <td className='modalDelete'>
                      <Modal open={modalOpenDelete && modalOrderId === order.id} onClose={handleCloseModal}>
                        <h2 className='textModal'>Estas seguro que deseas eliminar el pedido de la mesa {order.table} ?</h2>
                        <div>
                          <Button label='CONFIRMAR' onClick={() => handleConfirmDeleteClick(order.id)} classButton='buttonsModal'></Button>
                          <Button label='CANCELAR' onClick={handleCloseModal} classButton='buttonsModal'></Button>
                        </div>
                      </Modal>
                      <Modal open={modalOpenEdit && modalOrderId === order.id} onClose={handleCloseModal}>
                        <h2 className='textModal'>Editando pedido de la mesa {order.table}:</h2>
                        <Input 
                          type='number' 
                          placeholder='Escribe aquí'   
                          label='MESA:' 
                          classInputLabel='labelsModalEdit'
                          classInput='inputModalEdit'
                          value= {order.table}
                        />
                        <Input 
                          type='text' 
                          placeholder='Escribe aquí'   
                          label='CLIENTE:' 
                          classInputLabel='labelsModalEdit'
                          classInput='inputModalEdit'
                          value= {order.client}
                        />
                        <div className='selectStatus'>
                          <label>ESTADO DEL PEDIDO:</label>
                          <select value={order.status} >
                            <option value='Entregado'>Entregado</option>
                            <option value='Listo en barra'>Listo en barra</option>
                            <option value='En preparación'>En preparación</option>
                          </select>
                        </div>
                        <div>
                          <Button label='CONFIRMAR' classButton='buttonsModal'></Button>
                          <Button label='CANCELAR' onClick={handleCloseModal} classButton='buttonsModal'></Button>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <LogoutButton />
      </div>
    </>
  );
}