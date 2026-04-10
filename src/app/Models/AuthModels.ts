export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}
