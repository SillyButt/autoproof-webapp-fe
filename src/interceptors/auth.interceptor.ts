import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = window.localStorage.getItem('app-token');
  if (!token) return next(req);
  
  const isReceiverBackend = req.url.startsWith(environment.backendApiUrl);
  if (!isReceiverBackend) return next(req);

  const copy = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});

  return next(copy);
};
