import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (
        error.status !== 401 ||
        !token ||
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/refresh')
      ) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap((response) => {

          // Save the new tokens
          authService.saveTokens(
            response.token,
            response.refreshToken
          );

          // Clone the original request with the new access token
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.token}`,
            },
          });

          // Retry the original request
          return next(retryReq);
        }),

        catchError((refreshError) => {
          authService.clearTokens();
          router.navigateByUrl('/login');

          return throwError(() => refreshError);
        })
      );
    })
  );
};