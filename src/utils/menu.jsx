import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function useMenuLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [showMenu, setShowMenu] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [cartData, setCartData] = useState([]);

  const handleClickAdd = useCallback((product, arr) => {
    const result = arr.find(p => p.id === product.id);
    if (result !== undefined) {
      product.qty += 1
    } else {
      product.qty = 1
      arr.push(product)
    }
  }, []);

  const handleClickRemove = useCallback((product) => {
    if (product.qty > 1){
      product.qty -= 1;
    }
  }, []);

  const handleClickDelete = useCallback(() => {
    console.log('Eliminaste un producto del carrito')
  }, []);

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
  }, [navigate, token, userId, showMenu, cartData, handleClickAdd, handleClickDelete, handleClickRemove]);

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

  /* const addQtyProperty = (productId, arr, newProperty) => {
    return arr.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          ...newProperty
        };
      }
      return product;
    });
  };

  const addItemToQtyProperty = (productId, arr) => {
    return arr.map(product => {
      if (product.id === productId) {
        product.qty += 1;
        console.log(product)
        return product;
      }
      return product;
    });
  }; */

  const handleClickProduct = (product) => {
    const productsArr = cartData
    if (product.qty === undefined) {
      product.qty = 0;
      productsArr.push(product);
    }
    if (checkProductExists(product, productsArr)){
      product.qty += 1;
    } 
    setCartData(productsArr);
    return cartData;
  };

  const countProducts = (id, arr) => arr.filter(p => p.id === id).length;

  const checkProductExists = (product, arr) => countProducts(product.id, arr) > 0;

  const handleClickKitchen = () => {
    console.log('Has enviado la orden a cocina')
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
    handleOrdersClick,
    handleBreakfastClick,
    handleLunchClick,
    handleClickProduct,
    countProducts,
    handleClickAdd,
    handleClickRemove,
    handleClickDelete,
    handleClickKitchen
  }
}