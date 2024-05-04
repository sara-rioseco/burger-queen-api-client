import axios from 'axios';

export const url = 'https://bq-api.vercel.app';
// export const url = 'http://localhost:8080';

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
