export interface IUserRequest {
  username: string;
  password: string;
}

export interface IRefreshResponse {
  token: string;
}

export interface ILoginResponse {
  token: string;
}

export interface ILoginFormValues {
  username: string;
  password: string;
}
