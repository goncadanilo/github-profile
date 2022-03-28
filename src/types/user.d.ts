export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  subscriptions_url: string;
  repos_url: string;
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
