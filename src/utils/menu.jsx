import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function MenuLogic() {
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
    });
  }, [navigate, token, userId, showMenu, cartData]);

  const breakfastProducts = productsData.filter(product => product.type === 'Desayuno');
  const lunchProducts = productsData.filter(product => product.type === 'Almuerzo');

  const handleClickOrders = () => {
    navigate('/orders');
  };

  const handleClickDesayuno = () => {
    setShowMenu(true)
  };

  const handleClickAlmuerzo = () => {
    setShowMenu(false)
  };

  const handleClickProduct = (product) => {
    const productsArr = cartData;
    if (product.qty === undefined) {
      product.qty = 0;
      productsArr.push(product);
    }
    if (checkProductExists(product, productsArr)){
      product.qty += 1;
    } 
    console.log('el carrito tiene:', productsArr)
    setCartData(productsArr);
    return cartData;
  };

  const countProducts = (id, arr) => arr.filter(p => p.id === id).length;

  const checkProductExists = (product, arr) => countProducts(product.id, arr) > 0;

  const handleClickAdd = (product, arr) => {
    const result = arr.find(p => p === product)
    if (result) {
      product.qty += 1
    } else {
      arr.push(product)
    }
  };

  const handleClickRemove = (product) => {
    if (product.qty > 1){
      product.qty -= 1;
    }
  };

  const handleClickDelete = () => {
    console.log('Eliminaste un producto del carrito')
  };

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
    handleClickOrders,
    handleClickDesayuno,
    handleClickAlmuerzo,
    handleClickProduct,
    countProducts,
    handleClickAdd,
    handleClickRemove,
    handleClickDelete,
    handleClickKitchen
  }
}