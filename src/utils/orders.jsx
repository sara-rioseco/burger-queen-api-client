/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function useOrdersLogic() {
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

  return {
    getProductsList,
    getTotalOrder,
    handleMenuClick,
    getStatusColor,
    handleCheckClick,
    handleConfirmDeleteClick,
    handleOpenModalDelete,
    handleCloseModal,
    handleOpenEditModal,
    handleEditModalProductQtyChange,
    getUpdatedOrder,
    handleConfirmEditClick,
    getUpdatedTotalOrder,
    handleAddProductToOrder,
    handleEditModalProductDelete,
    ordersData,
    modalOpenDelete,
    modalOrderId,
    modalOpenEdit,
    editModalTable,
    setEditModalTable,
    editModalClient,
    setEditModalClient,
    editModalStatus,
    setEditModalStatus,
    productsData,
    editModalProducts,
  };
}