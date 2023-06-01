// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { lastValueFrom } from 'rxjs';
// import { NotificationType } from 'src/app/enum/notification-type.enum';
// import { ToastService } from 'src/app/notification/services/toast.service';
// import { environment } from 'src/environments/environment';
// const ACCESS_TOKEN_KEY = 'access_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';

// @Injectable({providedIn: 'root'})
// export class AuthenticationGuard implements CanActivate {




//   public jwtHelper: JwtHelperService = new JwtHelperService();

//   constructor(private router: Router, private http: HttpClient, private toastService: ToastService) {
//   }
//   async canActivate() {
//     const token = localStorage.getItem(ACCESS_TOKEN_KEY);

//     if (token && !this.jwtHelper.isTokenExpired(token)) {
//       return true;
//     }

//     const isRefreshSuccess = await this.refreshingTokens(token);
//     if (!isRefreshSuccess) {
//       this.router.navigate(["login"]);
//     }

//     return isRefreshSuccess;
//   }

//   private async refreshingTokens(token: string | null): Promise<boolean> {
//     const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_KEY);

//     if (!token || !refreshToken) {
//       return false;
//     }

//     const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

//     let isRefreshSuccess: boolean;
//     try {

//       const httpOptions = {
//         headers: new HttpHeaders({ 
//           'Authorization': `Bearer ${refreshToken}`
//         })
//       };

//       const response = await lastValueFrom(this.http.get(environment.host + "/api/token/refresh", httpOptions));
//       const newToken = (<any>response).access_token;
//       const newRefreshToken = (<any>response).refresh_token;
//       localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
//       localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
//       this.toastService.showSuccessToast("Login Status", "Token renewed successfully");
//       isRefreshSuccess = true;
//     }
//     catch (ex) {
//       isRefreshSuccess = false;
//     }
//     return isRefreshSuccess;
//   }

// }
