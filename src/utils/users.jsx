// UsersLogic.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function UsersLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  
  const [usersData, setUsersData] = useState([]);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    ApiRequest({
      url: 'http://localhost:8080/users',
      method: 'get',
    })
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          navigate('/login');
        } else {
          navigate('/error-page');
        }
      });
  }, [navigate, token]);

  // TRADUCIR EL PUESTO A ESPAÑOL SEGUN EL ROL
  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'waiter':
        return 'Mesero';
      case 'chef':
        return 'Cocinero';
      default:
        return role;
    }
  };

  // ABRE MODAL PARA CONFIRMAR BORRAR UN USUARIO AL CLICKEAR BOTON DE LA TABLA
  const handleOpenModalDelete = (userId) => {
    setModalUserId(userId);
    setModalOpenDelete(true);
  }

  // FUNCIÓN PARA CONFIRMAR BORRAR UNA ORDEN EN LA MODAL
  const handleConfirmDeleteClick = (userId) => {
    const userDelete = usersData.find(user => user.id === userId);

    const body = userDelete;

    ApiRequest({
      url: `http://localhost:8080/users/${userId}`,
      method: 'delete',
      body: body,
    })
      .then(() => {
        // Actualiza la informacion de la tabla para borrar la orden en ella
        setUsersData(prevUsers => prevUsers.filter(user => user.id !== userId));
        setModalOpenDelete(false);
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

  const handleCloseModal = () => {
    setModalUserId(null); // Limpiar el orderId al cerrar la modal
    setModalOpenDelete(false);
  };

  return {
    usersData,
    getRoleLabel,
    handleOpenModalDelete,
    handleConfirmDeleteClick,
    setModalOpenDelete,
    handleCloseModal,
    modalUserId,
    modalOpenDelete
  };
}
