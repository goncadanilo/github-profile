import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://github.com/login/oauth/access_token',
  headers: { Accept: 'application/json' },
});

export const api = axios.create({
  baseURL: 'https://api.github.com/',
});

export const fetchLoggedUser = async (token: string) => {
  const response = await api.get('/user', {
    headers: { Authorization: `token ${token}` },
  });
  return response.data;
};

export const fetchUserByUsername = async (token: string, username: string) => {
  const response = await api.get(`/users/${username}`, {
    headers: { Authorization: `token ${token}` },
  });

  return response.data;
};
