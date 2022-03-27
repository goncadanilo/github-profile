export interface UserSession {
  expires: Date;
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
}
