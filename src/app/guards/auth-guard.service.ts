import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
//to protect the routes, Angular provides the CanActivate interface
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }

  //The canActivate method triggers before the Angular route activates, it acts as a guard to the Angular routes.
  // Inside the canActivate method, we can write any custom logic to protect our routes.
  canActivate() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}