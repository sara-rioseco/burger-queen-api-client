import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';6

// LÓGICA DE LA SECCIÓN COCINA

export function useKitchenLogic() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [ordersData, setOrdersData] = useState([]);
  const [stopwatch, setStopwatch] = useState(true);
    
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    ApiRequest({
      url: 'http://localhost:8080/orders',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const Orders = response.data
      setOrdersData(Orders);
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

  const pendingOrders = ordersData.filter(order => order.status === 'En preparación');
  const preparedOrders = ordersData.filter(order => order.status === 'Listo en barra');


// Calcular el tiempo desde creación de la orden
  const calculateTimePassed = (orderTime) => {
    const orderTimeFirstFormat = orderTime + '.000Z';
    const orderTimeUNIX = new Date((orderTimeFirstFormat).replace(/\s/, 'T')).getTime();
    const timeNowUNIX = new Date().getTime();
    return millisecondsToTime(timeNowUNIX - orderTimeUNIX);
  }
// Convertir los milisegundos a minutos, segundos y horas
  const millisecondsToTime = (ms) => {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

  return {
    navigate,
    token,
    userId,
    ordersData,
    pendingOrders,
    preparedOrders,
    stopwatch,
    setOrdersData,
    setStopwatch,
    calculateTimePassed
  }
}