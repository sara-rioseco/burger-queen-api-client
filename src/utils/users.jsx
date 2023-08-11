// UsersLogic.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function UsersLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  const [usersData, setUsersData] = useState([]);
  const [modalOpenDeleteUsers, setModalOpenDeleteUsers] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);
  const [modalOpenEditUsers, setModalOpenEditUsers] = useState(false);
  const [editingUserData, setEditingUserData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [errorLabel, setErrorLabel] = useState('');
  const [errorLabelEdit, setErrorLabelEdit] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(['admin', 'waiter', 'chef']);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (role != 'admin') {
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

  // FILTRO DE USUARIOS POR PUESTO
  const handleRoleCheckboxChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(selectedRole => selectedRole !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

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

  // FUNCIÓN PARA CONFIRMAR BORRAR UN USUARIO EN LA MODAL
  const handleConfirmDeleteClickUsers = (userId) => {
    const userDelete = usersData.find(user => user.id === userId);

    const body = userDelete;

    ApiRequest({
      url: `http://localhost:8080/users/${userId}`,
      method: 'delete',
      body: body,
    })
      .then(() => {
        // Actualiza la informacion de la tabla para borrar el usuario en ella
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

  // ABRRIR MODAL EDITAR CON LOS DATOS DEL USUARIO AL CLICKEAR BOTON DE LA TABLA
  const handleOpenEditModalUsers = (usersId) => {
    const userToEdit = usersData.find(user => user.id === usersId);
    setEditingUserData({
      ...userToEdit,
      password: '', // Deja el campo de contraseña inicialmente vacío
    });
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
    }

    if (updateUsers.password === '') {
      setErrorLabelEdit('Completa todos los campos');
      return;
    }

    ApiRequest({
      url: `http://localhost:8080/users/${editingUserData.id}`,
      method: 'patch',
      body: updateUsers,
    })
      .then(() => {
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

  // ABRE LA MODAL PARA AGREGAR UN USUARIO CON LOS CAMPOS VACÍOS
  const handleAddClick = () => {
    setNewUser({
      email: '',
      password: '',
      role: '',
    });
    setAddModalOpen(true);
  };

  // CONFIRMA QUE SE AGREGUE UN USUARIO Y ACTUALIZA LA INFORMACIÓN EN LA TABLA
  const handleConfirmAddClick = () => {
    const hasEmptyFields = Object.values(newUser).some(value => value === '');
    if (hasEmptyFields) {
      setErrorLabel('Completa todos los campos');
      return;
    }

    ApiRequest({
      url: `http://localhost:8080/users`,
      method: 'post',
      body: newUser,
    })
      .then((response) => {
        const dataNewUser = response.data.user;
        setUsersData(prevUsers => [...prevUsers, dataNewUser]);
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          console.error(error);
          navigate('/login');
        } if (error.response.data === 'Email format is invalid' && error.response.status === 400) {
          setErrorLabel('Formato del correo inválido');
          return;
        } if (error.response.data === 'Email already exists' && error.response.status === 400) {
          setErrorLabel('El usuario ya existe');
          return;
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
    setAddModalOpen(false);
  };

  return {
    usersData,
    getRoleLabel,
    handleOpenModalDeleteUsers,
    handleConfirmDeleteClickUsers,
    handleOpenEditModalUsers,
    setModalOpenDeleteUsers,
    handleCloseModalUsers,
    handleAddClick,
    setNewUser,
    handleInputChange,
    handleConfirmEditClickUsers,
    handleConfirmAddClick,
    handleRoleCheckboxChange,
    setErrorLabelEdit,
    modalUserId,
    modalOpenDeleteUsers,
    modalOpenEditUsers,
    editingUserData,
    addModalOpen,
    newUser,
    selectedRoles,
    errorLabel,
    errorLabelEdit,
  };
}
