import axios from 'axios';

export default function ApiRequest({ url, method, body }) {
  const token = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: body,
  });
}
