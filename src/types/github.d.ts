export interface User {
  login: string;
  avatar_url: string;
  name: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  twitter_username?: string;
  followers: number;
  following: number;
}

export interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  description: string;
  language: string;
  stargazers_count: number;
  forks: number;
  html_url: string;
}
