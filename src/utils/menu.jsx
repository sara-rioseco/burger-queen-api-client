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
  }, [navigate, token, userId, showMenu, cartData, setCartData]);

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
    productsArr.push(product)
    console.log('array del carrito', productsArr)
    return productsArr;
  };

  const productsArr = product => handleClickProduct(product)

  const handleCountProducts = (product, arr) => arr.filter(p => p === product).length;

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
    setCartData,
    productsArr,
    handleClickOrders,
    handleClickDesayuno,
    handleClickAlmuerzo,
    handleClickProduct,
    handleCountProducts,
    handleClickAdd,
    handleClickRemove,
    handleClickDelete,
    handleClickKitchen
  }
}