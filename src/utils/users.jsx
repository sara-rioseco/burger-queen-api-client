// UsersLogic.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function UsersLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const [usersData, setUsersData] = useState([]);
  const [modalOpenDeleteUsers, setModalOpenDeleteUsers] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);
  const [modalOpenEditUsers, setModalOpenEditUsers] = useState(false);
  const [editingUserData, setEditingUserData] = useState(null);

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
  const handleOpenModalDeleteUsers = (userId) => {
    setModalUserId(userId);
    setModalOpenDeleteUsers(true);
  }

  // FUNCIÓN PARA CONFIRMAR BORRAR UNA ORDEN EN LA MODAL
  const handleConfirmDeleteClickUsers = (userId) => {
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
        setModalOpenDeleteUsers(false);
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

  // ABRRIR MODAL EDITAR CON LOS DATOS DE LA ORDEN AL CLICKEAR BOTON DE LA TABLA
  const handleOpenEditModalUsers = (usersId) => {
    const userToEdit = usersData.find(user => user.id === usersId);
    setEditingUserData(userToEdit);
    setModalUserId(usersId);
    setModalOpenEditUsers(true);
  }

  // MANEJO DE LOS CAMBIOS DE VALORES DE LOS CAMPOS DE LA MODAL EDITAR
  const handleInputChange = (fieldName, value) => {
    setEditingUserData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // CONFIRMA LA EDICIÓN DEL USUARIO
const handleConfirmEditClickUsers = () => {
  const updateUsers = {
    email: editingUserData.email,
    password: editingUserData.password,
    role: editingUserData.role,
  };

  ApiRequest({
    url: `http://localhost:8080/users/${editingUserData.id}`,
    method: 'patch',
    body: updateUsers,
  })
    .then((response) => {
      console.log(response.data, 'updated');

      // ACTUALIZA LA DATA CON LA INFORMACIÓN OBTENIDA DE LA EDICIÓN
      const updatedUsersData = usersData.map(user => {
        if (user.id === editingUserData.id) {
          return {
            ...user,
            email: editingUserData.email,
            password: editingUserData.password,
            role: editingUserData.role,
          };
        } else {
          return user;
        }
      });

      setUsersData(updatedUsersData);
      handleCloseModalUsers();
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
};

  // CERRAR DIÁLOGOS MODALES
  const handleCloseModalUsers = () => {
    setModalUserId(null); // Limpiar el usersId al cerrar la modal
    setModalOpenDeleteUsers(false);
    setModalOpenEditUsers(false);
  };

  return {
    usersData,
    getRoleLabel,
    handleOpenModalDeleteUsers,
    handleConfirmDeleteClickUsers,
    handleOpenEditModalUsers,
    setModalOpenDeleteUsers,
    handleCloseModalUsers,
    modalUserId,
    modalOpenDeleteUsers,
    modalOpenEditUsers,
    editingUserData,
    handleInputChange,
    handleConfirmEditClickUsers,
  };
}
