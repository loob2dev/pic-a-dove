import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserService {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['sign']);
      return false;
    } else if(!this.auth.isUserState()){
      this.router.navigate(['admin']);
      return false;
    }

    return true;
  }
}
