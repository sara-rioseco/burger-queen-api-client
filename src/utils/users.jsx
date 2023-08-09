// UsersLogic.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function UsersLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    ApiRequest({
      url: 'http://localhost:8080/users',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          navigate('/error-page');
        }
      });
  }, [navigate, token]);

  // Otras funciones y estados relacionados con la lógica de usuarios

  return {
    usersData,
    // Otras funciones y estados
  };
}
