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
  const [productCount, setProductCount] = useState(0);

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
  }, [navigate, token, userId, showMenu, cartData, productCount]);

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
    console.log('antes de agregar', productsArr)
    if (product.qty === undefined) {
      product.qty = 0;
      productsArr.push(product);
    }
    if (checkProductExists(product, productsArr)){
      product.qty += 1;
    } 
    setCartData(productsArr);
    console.log('después de agregar', cartData)
    return cartData;
  };

  const checkProductExists = (product, arr) => arr.filter(p => p.id === product.id).length > 0;

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
    productCount,
    setProductCount,
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