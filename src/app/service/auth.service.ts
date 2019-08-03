import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token == null? false : true;
    // return !this.jwtHelper.isTokenExpired(token);
  }

  public isUserState(): boolean {
    const type = localStorage.getItem('type');

    return type == '2' ? false : true;
  }
}