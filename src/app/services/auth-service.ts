import { Injectable } from '@angular/core';
import { API_CONFIG } from '../enums/api.enums';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginReq, LoginResponse, RegisterRequest } from '../models/auth';
import { UserInfo } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authBaseUrl = API_CONFIG.baseURl;

  constructor(private _http: HttpClient) {}

  login(creds: LoginReq): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      `${this.authBaseUrl}${API_CONFIG.endpoints.auth.login}`,
      creds
    );
  }
  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this._http.post<LoginResponse>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.auth.refreshToken}`,
      { refreshToken }
    );
  }

  register(req: RegisterRequest): Observable<unknown> {
    return this._http.post<unknown>(
      `${this.authBaseUrl}${API_CONFIG.endpoints.auth.register}`,
      req
    );
  }

  deleteAccount(password: string): Observable<unknown> {
    return this._http.delete<unknown>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.auth.delete}`,
      { body: { password } }
    );
  }
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getCurrentUser(): UserInfo | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log('payload: ', payload);

      return {
        fullName: payload.fullName,
        email:
          payload.email ??
          payload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
      };
    } catch {
      return null;
    }
  }
}
