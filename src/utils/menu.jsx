import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';6

// LÓGICA DE LA SECCIÓN MENÚ
export function useMenuLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [showMenu, setShowMenu] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);
  const [modalClientName, setModalClientName] = useState(false);
  const [modalTableNumber, setModalTableNumber] = useState(false);
  const [modalOrderProducts, setModalOrderProducts] = useState(false);
  const [modalOrderConfirmation, setModalOrderConfirmation] = useState(false);
  const [modalOrderSuccess, setModalOrderSuccess] = useState(false);
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [orderProducts, setOrderProducts] = useState([]);

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
      if (error.response.data === 'jwt expired' && error.response.status === 401) {
        console.error(error);
        navigate('/login');
      } else {
        console.error(error);
        error && navigate('/error-page');
      }
    });
  }, [navigate, token, userId]);
  
  const breakfastProducts = productsData.filter(product => product.type === 'Desayuno');
  const lunchProducts = productsData.filter(product => product.type === 'Almuerzo');

  //navegar a orders 
  const handleOrdersClick = () => {
    navigate('/orders');
  };

  //mostrar productos de desayuno
  const handleBreakfastClick = () => {
    setShowMenu(true)
  };

  //mostrar productos de almuerzo
  const handleLunchClick = () => {
    setShowMenu(false)
  };
  
  //agregar producto al carrito
  const handleClickProduct = (product) => {
    setCartData(prevCartData => {
      const updatedCartData = [...prevCartData];
        if (checkProductExists(product, updatedCartData)){
          const existingProductIndex = updatedCartData.findIndex((p) => p.id === product.id);
          // Clonar el objeto del producto para evitar modificar el objeto original
          const clonedProduct = { ...updatedCartData[existingProductIndex] };
          clonedProduct.qty += 1;
          updatedCartData[existingProductIndex] = clonedProduct;
        } else {
          product.qty = 1;
          updatedCartData.push(product);
        }
      return updatedCartData;
    })
  };

  //chequear si el producto ya existe en el carrito
  const checkProductExists = (item, arr) => arr.filter(p => p.id === item.id).length > 0;

  //obtener precio total de todos los productos en el carrito
  const getTotalPrice = () => cartData.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  //agregar una unidad del producto con botón '+'
  const handleClickAdd = (product) => {
    setCartData(prevCartData => {
      const updatedCartData = [...prevCartData];
      const existingProductIndex = updatedCartData.findIndex((p) => p.id === product.id);
      if (checkProductExists(product, updatedCartData)) {
        const clonedProduct = { ...updatedCartData[existingProductIndex] };
        clonedProduct.qty += 1;
        updatedCartData[existingProductIndex] = clonedProduct;
      }
      return updatedCartData;
    });
  };

  //eliminar una unidad del producto con botón '-' (mínimo 1 unidad)
  const handleClickRemove = (product) => {
    setCartData(prevCartData => {
      const updatedCartData = [...prevCartData];
      const existingProductIndex = updatedCartData.findIndex((p) => p.id === product.id);
      if (checkProductExists(product, updatedCartData)) {
        const clonedProduct = { ...updatedCartData[existingProductIndex] };
        if (clonedProduct.qty === 1) {
          handleClickOpenDelete(product);
        } else {
        clonedProduct.qty -= 1;
        updatedCartData[existingProductIndex] = clonedProduct;
        }
      }
      return updatedCartData;
    });
  };

  // abrir modal para confirmar eliminación del producto
  const handleClickOpenDelete = (product) => {
    const updatedProductId = product.id;
    setModalProductId(updatedProductId);
    setModalDelete(true);
  };

  // cerrar modal
  const handleCloseModal = () => {
    setModalProductId(null);
    setModalDelete(false);
  };
  
  // eliminar producto del carrito (todas las unidades)
  const handleDelete = (product) => {
    setCartData(prevCartData => {
      const updatedCartData = [...prevCartData];
      const existingProductIndex = updatedCartData.findIndex((p) => p.id === product.id);
       updatedCartData.splice(existingProductIndex, 1);
       setModalProductId(null);
       setModalDelete(false);
       return updatedCartData;
    });
  };

  //manejo de modales de alerta
  const handleOpenModalClientName = () => { // alerta de falta de cliente
    setModalClientName(true);
    setModalOrderConfirmation(false);
  };

  const handleOpenModalTableNumber = () => { // alerta de falta de mesa
    setModalTableNumber(true);
    setModalOrderConfirmation(false);
  };

  const handleOpenModalOrderProducts = () => { // alerta de falta de productos en el carrito
    setModalOrderProducts(true);
    setModalOrderConfirmation(false);
  };

  const handleOpenModalOrderConfirmation = () => setModalOrderConfirmation(true); // confirmación de creación de orden

  const handleOpenModalOrderSuccess = () => setModalOrderSuccess(true); // alerta de orden creada

  // cerrar modales
  const handleCloseModalClientName = () => setModalClientName(false); 

  const handleCloseModalTableNumber = () => setModalTableNumber(false);

  const handleCloseModalOrderProducts = () => setModalOrderProducts(false);

  const handleCloseModalOrderConfirmation = () => setModalOrderConfirmation(false);

  const handleCloseModalOrderSuccess = () => {
    setModalOrderSuccess(false);
    setModalOrderConfirmation(false);
  }

  // obtener fecha y hora actuales en formato correcto
  const getDateAndTime = () => {
    const now = new Date();
    return now.toISOString().replace(/[TZ]+/gm, ' ').substring(0, 19)
  }

  // construir nueva orden
  const getOrderData = async (client, table, products) => {
    const newOrder = {
      userId: userId,
      client: client,
      table: table,
      products: products.map((product) => ({
        qty: product.qty,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          type: product.type,
          dateEntry: product.dateEntry
        },
      })),
      status: 'En preparación',
      dateEntry: getDateAndTime(),
    };
    return newOrder;
  };

  //obtener info de cliente y mesa
  const getClientAndTable = async () => {
    const client = await document.getElementById('client').value;
    const table = await document.getElementById('table').value;
    return {
      client,
      table,
    }
  };

  //limpiar inputs
  const clearClientAndTable = async () => {
    document.getElementById('client').value = '';
    document.getElementById('table').value = 'default'
  }

  // validar inputs
  const validateInputs = async (cartData) => {
    const response = await getClientAndTable();
    if (cartData.length === 0) {
      handleOpenModalOrderProducts();
      return false;
    } else if (response.client === '') {
      handleOpenModalClientName();
      return false;
    } else if (response.table === 'default') {
      handleOpenModalTableNumber();
      return false;
    } else {
      return true
    }
  }

  // enviar petición para crear nueva orden a la API
  const handleCreateOrder = async (cartData) => {
    const response = await getClientAndTable();
    const client = response.client;
    const table = response.table;
    setClientName(client);
      setTableNumber(table);
      setOrderProducts(cartData);
      const updatedOrderProducts = [...cartData];
      const updatedClient = client;
      const updatedTableNumber = table;
      const body = await getOrderData(updatedClient, updatedTableNumber, updatedOrderProducts);
      console.log(body)
      ApiRequest({
        url: 'http://localhost:8080/orders',
        method: 'post',
        body: body,
      })
        .then(() => {
          console.log ('Orden creada y en preparación')
          setCartData([]);
          setClientName('');
          setTableNumber('default');
          clearClientAndTable();
          handleOpenModalOrderSuccess();
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
  
  return {
    navigate,
    token,
    userId,
    showMenu,
    productsData,
    breakfastProducts,
    lunchProducts,
    cartData,
    setCartData,
    getTotalPrice,
    modalDelete,
    setModalDelete,
    clientName,
    tableNumber,
    orderProducts,
    modalProductId,
    setModalProductId,
    modalClientName,
    handleOpenModalClientName,
    handleCloseModalClientName,
    modalTableNumber,
    handleOpenModalTableNumber,
    handleCloseModalTableNumber,
    modalOrderProducts,
    handleOpenModalOrderProducts,
    handleCloseModalOrderProducts,
    modalOrderConfirmation,
    handleOpenModalOrderConfirmation,
    handleCloseModalOrderConfirmation,
    modalOrderSuccess,
    handleOpenModalOrderSuccess,
    handleCloseModalOrderSuccess,
    setModalClientName,
    setModalTableNumber,
    setModalOrderProducts,
    setModalOrderConfirmation,
    setModalOrderSuccess,
    handleOrdersClick,
    handleBreakfastClick,
    handleLunchClick,
    handleClickProduct,
    handleClickAdd,
    handleClickRemove,
    handleClickOpenDelete,
    handleCloseModal,
    handleDelete,
    handleCreateOrder,
    validateInputs
  }
}