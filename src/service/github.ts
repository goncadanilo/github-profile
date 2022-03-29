import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://github.com/login/oauth/access_token',
  headers: { Accept: 'application/json' },
});

export const api = axios.create({
  baseURL: 'https://api.github.com/',
});

export const getLoggedUser = async (token: string) => {
  const response = await api.get('/user', {
    headers: { Authorization: `token ${token}` },
  });
  return response.data;
};

export const getUserByUsername = async (token: string, username: string) => {
  const response = await api.get(`/users/${username}`, {
    headers: { Authorization: `token ${token}` },
  });

  return response.data;
};

export const getRepositoriesByUsername = async (
  token: string,
  username: string,
) => {
  const response = await api.get(`/users/${username}/repos`, {
    headers: { Authorization: `token ${token}` },
  });

  return response.data;
};
