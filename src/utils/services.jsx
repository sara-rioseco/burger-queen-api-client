import axios from 'axios';

export function Services() {
  const getTokenAdmin = () => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const body = {
      email: 'grace.hopper@systers.xyz',
      password: '123456'
    }
    axios.post('https://burger-queen-api-mock-r47a.onrender.com/login', body, { headers })
      .then(result => {
        console.log(result.data.accessToken)
        return result.data.accessToken
      })
      .catch((error) => console.error(error));
  };

  const getTokenWaiter = () => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const body = {
      email: 'iamawaiter@mail.com',
      password: '123456'
    }
    axios.post('https://burger-queen-api-mock-r47a.onrender.com/login', body, { headers })
      .then(result => {
        console.log(result.data.accessToken)
        return result.data.accessToken
      })
      .catch((error) => console.error(error));
  };

  const getTokenChef = () => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const body = {
      email: 'iamachef@mail.com',
      password: '123456'
    }
    axios.post('https://burger-queen-api-mock-r47a.onrender.com/login', body, { headers })
      .then(result => {
        console.log(result.data.accessToken)
        return result.data.accessToken
      })
      .catch((error) => console.error(error));
  }

  return {
    getTokenAdmin,
    getTokenWaiter,
    getTokenChef
  }
}