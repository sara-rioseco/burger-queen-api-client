import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function LoginLogic() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordInputType = () => {
    return showPassword ? 'text' : 'password';
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: name,
        password: password,
      });
      console.log(response);
      console.log(response.data);
      console.log(response.data.accessToken);
      console.log(response.data.user);
      console.log(response.data.user.role);
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