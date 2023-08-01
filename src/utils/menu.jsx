import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function MenuLogic() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [showMenu, setShowMenu] = useState('Desayuno');
  const [productsData, setProductsData] = useState([]);

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
  }, [navigate, token, userId, showMenu]);

  const breakfastProducts = productsData.filter(product => product.type === 'Desayuno');
  const lunchProducts = productsData.filter(product => product.type === 'Almuerzo');

  const handleClickOrders = () => {
    navigate('/orders');
  };

  const checkMenuState = () => {
    showMenu === 'Desayuno' && setShowMenu('Desayuno')
    showMenu === 'Almuerzo' && setShowMenu('Almuerzo')
  }

  const handleClickProduct = () => {
    console.log('Agregaste un producto al carrito')
  };
  
  const handleClickAdd = () => {
    console.log('Agregaste una unidad del producto')
  };

  const handleClickRemove = () => {
    console.log('Eliminaste una unidad del producto')
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
    handleClickOrders,
    checkMenuState,
    handleClickProduct,
    handleClickAdd,
    handleClickRemove,
    handleClickDelete,
    handleClickKitchen
  }
}