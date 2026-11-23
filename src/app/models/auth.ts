export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}
