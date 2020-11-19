import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'Task2WebAngular';

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  //To log out the user, we are simply going to delete the token stored in the local storage which is the only key to access protected resources.
  public logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }


}
