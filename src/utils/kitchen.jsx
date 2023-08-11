import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

// LÓGICA DE LA SECCIÓN COCINA

export function useKitchenLogic() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const [ordersData, setOrdersData] = useState([]);
  const [time, setTime] = useState(null);
  const [modalUpdateOrder, setModalUpdateOrder] = useState(false);
  const [modalUpdateOrderId, setModalUpdateOrderId] = useState(null);
    
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (role == 'waiter') {
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
  }, [navigate, token, userId, role]);

  const pendingOrders = ordersData.filter(order => order.status === 'En preparación');
  const preparedOrders = ordersData.filter(order => order.status === 'Listo en barra');

// Abrir modal para confirmar cambio de estado de la orden 


// Cambiar el estado de la orden a Listo en barra
const updateOrderStatus = (orderId) => {
  const body = {
    "status": "Listo en barra"
  };

  ApiRequest({
    url: `http://localhost:8080/orders/${orderId}`,
    method: 'patch',
    body: body,
  })
    .then(
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
      setModalUpdateOrder(false);
    }))
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

const handleOpenModalUpdateOrder = (id) => {
  setModalUpdateOrder(true);
  setModalUpdateOrderId(id);
};

const handleCloseModalUpdateOrder = () => {
  setModalUpdateOrder(false);
  setModalUpdateOrderId(null)
};


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

// Obtener tiempo de creación de la orden
  const getOrderTime = (order) => order.dateEntry  

// Actualizar setTime para que se renderice
  const handleUpdateTimer = (order) => {
      setTime(getOrderTime(order));
    return time
  }

// Ejecutar función cada segundo
const updateTimerEachSecond = (order) => window.setInterval(() => {
  handleUpdateTimer(order)
}, 1000);

  return {
    pendingOrders,
    preparedOrders,
    calculateTimePassed,
    updateTimerEachSecond,
    handleOpenModalUpdateOrder,
    handleCloseModalUpdateOrder,
    modalUpdateOrder,
    updateOrderStatus,
    modalUpdateOrderId
  }
}