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
  const [editModalTable, setEditModalTable] = useState('');
  const [editModalClient, setEditModalClient] = useState('');
  const [editModalStatus, setEditModalStatus] = useState(null);
  const [editModalProducts, setEditModalProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (!token) {
      // Redirigir al usuario al inicio de sesión si no hay un accessToken
      navigate('/login');
      return;
    }

    ApiRequest({
      url: 'http://localhost:8080/orders',
      method: 'get',
    })
      .then((response) => {
        console.log('Respuesta del servidor para todos los pedidos:', response.data);
        const filteredOrders = response.data.filter(
          (order) => order.userId === Number(userId)
        );

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

    ApiRequest({
      url: 'http://localhost:8080/products',
      method: 'get',
    })
      .then((response) => {
        setProductsData(response.data);
        console.log('Respuesta del servidor para los productos:', response.data);
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
    return prices.reduce(
      (total, item) => total + item.qty * item.product.price,
      0
    );
  };

  const handleMenuClick = () => {
    console.log('hola');
    navigate('/menu');
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Entregado': 'green',
      'Listo en barra': 'yellow',
      'En preparación': '',
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
    console.log('delete order', orderDelete);

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
    const order = ordersData.find((order) => order.id === orderId);
    setModalOrderId(orderId); // Establecer el orderId al abrir la modal de edición
    setModalOpenEdit(true); // Abrir la modal de edición
    setEditModalTable(order.table);
    setEditModalClient(order.client);
    setEditModalStatus(order.status);
    setEditModalProducts(order.products.map(product => ({
      qty: product.qty,
      productId: product.product.id,
      name: product.product.name,
      price: product.product.price,
    }))
    );
  }

  const handleEditModalProductQtyChange = (productId, event) => {
    const updatedProducts = editModalProducts.map((product) => {
      if (product.productId === productId) {
        return { ...product, qty: event.target.value };
      }
      return product;
    });
    setEditModalProducts(updatedProducts);
  };

  const getUpdatedOrder = () => {
    const updatedOrder = {
      client: editModalClient,
      table: editModalTable,
      products: editModalProducts.map((product) => ({
        qty: product.qty,
        product: {
          id: product.productId,
          name: product.name,
          price: product.price,
        },
      })),
      status: editModalStatus,
    };
    return updatedOrder;
  };

  const handleConfirmEditClick = () => {
    const orderId = modalOrderId;
    const body = getUpdatedOrder();
    console.log(orderId, '1');
    console.log(body, '2');


    ApiRequest({
      url: `http://localhost:8080/orders/${orderId}`,
      method: 'patch',
      body: body,
    })
      .then((response) => {
        console.log('Response from server edit order', response.data);
        console.log(orderId);

        setOrdersData(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order.id === orderId) {
              return { ...order, ...body };
            }
            return order;
          });
          return updatedOrders;
        });
        handleCloseModal();
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

  const getUpdatedTotalOrder = () => {
    return editModalProducts.reduce(
      (total, product) => total + product.qty * product.price,
      0
    );
  };

  const handleAddProductToOrder = (productId) => {
    const productToAdd = productsData.find((product) => product.id === Number(productId));
    if (productToAdd) {
      setEditModalProducts((prevProducts) => [
        ...prevProducts,
        {
          productId: productToAdd.id,
          name: productToAdd.name,
          qty: 1,
          price: productToAdd.price,
        },
      ]);
    }
  };

  const handleEditModalProductDelete = (productId) => {
    const updatedProducts = editModalProducts.filter((product) => product.productId !== productId);
    setEditModalProducts(updatedProducts);
  };

  return (
    <>
      <div className='containerOrders'>
        <Button
          label='MENU'
          onClick={handleMenuClick}
          classButton='buttonMenu' />
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
                  <td>
                    #{order.table}
                  </td>
                  <td>
                    {order.client}
                  </td>
                  <td>
                    {getProductsList(order.products)}
                  </td>
                  <td className={getStatusColor(order.status)}>
                    {order.status}
                  </td>
                  <td>
                    ${getTotalOrder(order.products)}
                  </td>
                  <td className='buttonsTable'>
                    <img
                      src={Edit}
                      className="edit"
                      alt="buttonEdit"
                      onClick={() => handleOpenEditModal(order.id)} />
                  </td>
                  <td className='buttonsTable'>
                    <img
                      src={Delete}
                      className="delete"
                      alt="buttonDelete"
                      onClick={() => handleOpenModalDelete(order.id)} />
                  </td>
                  <td className='buttonsTable'>
                    {order.status !== 'Entregado' && (
                      <img
                        src={Check}
                        className="check"
                        alt="buttonCheck"
                        onClick={() => handleCheckClick(order.id)}
                      />
                    )}
                  </td>
                  <td className='modalDelete'>
                    <Modal open={modalOpenDelete && modalOrderId === order.id} onClose={handleCloseModal}>
                      <h2 className='textModal'>Estas seguro que deseas eliminar el pedido de la mesa {order.table} ?</h2>
                      <div>
                        <Button
                          label='CONFIRMAR'
                          onClick={() => handleConfirmDeleteClick(order.id)}
                          classButton='buttonsModal'>
                        </Button>
                        <Button
                          label='CANCELAR'
                          onClick={handleCloseModal}
                          classButton='buttonsModal'>
                        </Button>
                      </div>
                    </Modal>
                    <Modal open={modalOpenEdit && modalOrderId === order.id} onClose={handleCloseModal}>
                      <h2 className='textModal'>Editando pedido de la mesa {order.table}:</h2>
                      <div className='infoOrderModal'>
                        <div className='infoClientModal'>
                          <Input
                            type='number'
                            placeholder='Escribe aquí'
                            label='MESA :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit cantidadModal'
                            value={editModalTable}
                            onChange={(event) => setEditModalTable(event.target.value)}
                          />
                          <Input
                            type='text'
                            placeholder='Escribe aquí'
                            label='CLIENTE :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit'
                            value={editModalClient}
                            onChange={(event) => setEditModalClient(event.target.value)}
                          />
                        </div>
                        <div className='selectStatusModal'>
                          <label className='bebas'>ESTADO : </label>
                          <select value={editModalStatus} onChange={(event) => setEditModalStatus(event.target.value)} className='boxSelect'>
                            <option value='Entregado'>Entregado</option>
                            <option value='Listo en barra'>Listo en barra</option>
                            <option value='En preparación'>En preparación</option>
                          </select>
                        </div>
                        <div className='selectProductModal'>
                          <label className='bebas'>AÑADIR PRODUCTO :</label>
                          <select value={''} onChange={(e) => handleAddProductToOrder(e.target.value)} className='boxSelect'>
                            <option value='' disabled>Seleccione un producto</option>
                            {productsData.map((product) => {
                              const isProductAlreadyAdded = editModalProducts.some(
                                (addedProduct) => addedProduct.productId === product.id
                              );

                              if (!isProductAlreadyAdded) {
                                return (
                                  <option key={product.id} value={product.id}>
                                    {product.name} - ${product.price}
                                  </option>
                                );
                              }

                              return null;
                            })}
                          </select>
                        </div>
                        <label className='bebas'>PEDIDO :</label>
                        <div className='lineModal'></div>
                        <div className='allProductsOrdersModal'>
                          {editModalProducts.map((product) => (
                            <div key={product.productId} className='productOrdersModal'>
                              <img
                                src={Delete}
                                className="deleteModal"
                                alt="buttonDelete"
                                onClick={() => handleEditModalProductDelete(product.productId)} />
                              <Input
                                key={product.productId}
                                type='number'
                                placeholder='Escribe aquí'
                                label={''}
                                name={`productQty_${product.productId}`}
                                classInputLabel='labelsModalEdit'
                                classInput='inputModalEdit cantidadModal'
                                value={product.qty}
                                onChange={(event) => handleEditModalProductQtyChange(product.productId, event)}
                              />
                              <p className='productPriceModal'><label>{product.name}</label><label>${product.price}</label></p>
                            </div>
                          ))}
                        </div>
                        <div className='lineModal'></div>
                        <div className='totalOrderModal'>
                          <label className='bebas'> TOTAL :</label> <label>${getUpdatedTotalOrder()}</label>
                        </div>
                      </div>
                      <div>
                        <Button
                          label='CONFIRMAR'
                          classButton='buttonsModal'
                          onClick={handleConfirmEditClick}
                        >
                        </Button>
                        <Button
                          label='CANCELAR'
                          onClick={handleCloseModal}
                          classButton='buttonsModal'>
                        </Button>
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