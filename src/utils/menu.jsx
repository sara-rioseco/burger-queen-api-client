import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';6

export function useMenuLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [showMenu, setShowMenu] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);
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

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  const handleBreakfastClick = () => {
    setShowMenu(true)
  };

  const handleLunchClick = () => {
    setShowMenu(false)
  };
  
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

  const checkProductExists = (item, arr) => arr.filter(p => p.id === item.id).length > 0;

  const getTotalPrice = () => cartData.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

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

  const handleClickOpenDelete = (product) => {
    const updatedProductId = product.id;
    setModalProductId(updatedProductId);
    setModalDelete(true);
  };

  const handleCloseModal = () => {
    setModalProductId(null);
    setModalDelete(false);
  };
  

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

  //enviar info de nueva orden a la API
  const handleCreateOrder = async (cartData) => {
    //obtener data de inputs
    const response = await getClientAndTable();
    const client = response.client;
    const table = response.table;
    if (cartData.length === 0) {
      alert('No se han seleccionado productos');
      return;
    } else if (response.client === '' || response.table === 'default') {
      alert('No se ha indicado un cliente o una mesa');
      return;
    } else {
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
  }
}