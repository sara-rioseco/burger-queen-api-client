import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useNameChange() {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return { name, handleNameChange };
}

export function usePasswordChange() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return { password, handlePasswordChange };
}

export function useTogglePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordInputType = () => {
    return showPassword ? 'text' : 'password';
  };

  return { showPassword, togglePasswordVisibility, getPasswordInputType };
}

export function useLoginClick() {
  const navigate = useNavigate();

  const handleLoginClick = async (name, password) => {
    try {
      const response = await axios.post('https://burger-queen-api-mock-r47a.onrender.com/login', {
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

  return { handleLoginClick };
}
