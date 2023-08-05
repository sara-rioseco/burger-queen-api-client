// HOOKS
import { useState } from 'react'; // manejar estados en los cambios
import { useNavigate } from 'react-router-dom'; // navegar entre router
// BIBLIOTECAS
import axios from 'axios';

// LÓGICA DE LA SECCIÓN DE LOGIN
export function LoginLogic() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    showPassword: false
  });

  // MANEJO DE CAMBIOS DE INPUTS
  const handleFieldChange = (field, event) => {
    if (field === 'name') {
      setFormData({ ...formData, name: event.target.value });
    } else if (field === 'password') {
      setFormData({ ...formData, password: event.target.value });
    }
  };

  // MANEJO DE MOSTRAR U OCULTAR CONTRASEÑA
  const togglePasswordVisibility = () => setFormData({ ...formData, showPassword: !formData.showPassword });

  const getPasswordInputType = () => formData.showPassword ? 'text' : 'password';

  // API REQUEST LOGIN
  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: formData.name,
        password: formData.password,
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
    formData,
    handleFieldChange,
    togglePasswordVisibility,
    getPasswordInputType,
    handleLoginClick,
  }
}