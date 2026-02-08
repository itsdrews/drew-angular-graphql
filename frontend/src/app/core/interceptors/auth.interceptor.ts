import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Pega o token salvo
  const token = localStorage.getItem('auth_token'); 

  // 2. Se tiver token, CLONA a requisição e adiciona o header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // 3. Se não tiver token, manda como está
  return next(req);
};