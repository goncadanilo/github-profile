import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.github.com/',
});

export const auth = axios.create({
  baseURL: 'https://github.com/login/oauth/access_token',
  headers: { Accept: 'application/json' },
});
