// HOOKS
import { useState } from 'react'; // manejar estados en los cambios
import { useNavigate } from 'react-router-dom'; // navegar entre router
import { url } from '../services/apiRequest';

// BIBLIOTECAS
import axios from 'axios';

// LÓGICA DE LA SECCIÓN DE LOGIN
export function LoginLogic() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    showPassword: false,
  });

  const [errorLabel, setErrorLabel] = useState('');

  // MANEJO DE CAMBIOS DE INPUTS
  const handleFieldChange = (field, event) => {
    if (field === 'name') {
      setFormData({ ...formData, name: event.target.value });
    } else if (field === 'password') {
      setFormData({ ...formData, password: event.target.value });
    }
  };

  // MANEJO DE MOSTRAR U OCULTAR CONTRASEÑA
  const togglePasswordVisibility = () =>
    setFormData({ ...formData, showPassword: !formData.showPassword });

  const getPasswordInputType = () =>
    formData.showPassword ? 'text' : 'password';

  // API REQUEST LOGIN
  const handleLoginClick = async () => {
    try {
      const response = await axios.post(`${url}/auth`, {
        email: formData.name,
        password: formData.password,
      });

      // Guardar el accessToken en el localStorage
      let token;
      if (response.data) {
        token = JSON.parse(atob(response.data.accessToken.split('.')[1]));
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', token.userId);
        localStorage.setItem('role', token.role.role);
      }

      token.role.role === 'admin' && navigate('/users');
      token.role.role === 'waiter' && navigate('/orders');
      token.role.role === 'chef' && navigate('/kitchen');
    } catch (error) {
      if (error.response) {
        if (
          error.response.data.error === 'Correo y contraseña son requeridos'
        ) {
          setErrorLabel('Completa los campos requeridos');
        } else if (error.response.data.error === 'Usuario no encontrado') {
          setErrorLabel('Usuario no registrado');
        } else if (error.response.data.error === 'Contraseña incorrecta') {
          setErrorLabel('Credenciales incorrectas');
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  };

  return {
    formData,
    handleFieldChange,
    errorLabel,
    togglePasswordVisibility,
    getPasswordInputType,
    handleLoginClick,
  };
}
