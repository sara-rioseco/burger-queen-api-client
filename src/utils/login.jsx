// HOOKS
import { useState } from 'react'; // manejar estados en los cambios
import { useNavigate } from 'react-router-dom'; // navegar entre router
// BIBLIOTECAS
import axios from 'axios';

// LÓGICA DE LA SECCIÓN DE LOGIN
export function LoginLogic() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // MANEJO DE CAMBIOS DE INPUTS
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // MANEJO DE MOSTRAR U OCULTAR CONTRASEÑA
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordInputType = () => {
    return showPassword ? 'text' : 'password';
  };

  // API REQUEST LOGIN
  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: name,
        password: password,
      });

      // Guardar el accessToken en el localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('userId', response.data.user.id);

      response.data.user.role === 'admin' && navigate('/users');
      response.data.user.role === 'waiter' && navigate('/orders');
      response.data.user.role === 'chef' && navigate('/kitchen');
    } catch (error) {
      console.error(error);
      error && navigate('/error-page');
    }
  };

  return {
    name,
    password,
    showPassword,
    handleNameChange,
    handlePasswordChange,
    togglePasswordVisibility,
    getPasswordInputType,
    handleLoginClick,
  }
}