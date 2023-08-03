import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function useMenuLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [showMenu, setShowMenu] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [cartData, setCartData] = useState([]);

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
  }, [navigate, token, userId, showMenu]);
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
          console.log(1, product.qty)
          console.log('hola', updatedCartData[existingProductIndex].qty)
          updatedCartData[existingProductIndex].qty += 1;
          console.log(2, product.qty)
        }
        if (!checkProductExists(product, updatedCartData)) {
          product.qty = 1;
          updatedCartData.push(product)
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
        updatedCartData[existingProductIndex].qty += 1;
      }
      return updatedCartData;
    });
  };

  const handleClickRemove = (product) => {
    setCartData(prevCartData => {
      const updatedCartData = [...prevCartData];
      const existingProductIndex = updatedCartData.findIndex((p) => p.id === product.id);
      if (checkProductExists(product, updatedCartData)) {
        updatedCartData[existingProductIndex].qty -= 1;
      }
      return updatedCartData;
    });
  };

  const handleClickDelete = () => {
    console.log('Eliminaste un producto del carrito')
  };

  const handleClickKitchen = () => {
    console.log('Se ha creado la orden y se ha enviado a la cocina')
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
    handleOrdersClick,
    handleBreakfastClick,
    handleLunchClick,
    handleClickProduct,
    handleClickAdd,
    handleClickRemove,
    handleClickDelete,
    handleClickKitchen
  }
}