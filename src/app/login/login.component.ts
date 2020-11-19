import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  // Inside the login method, we are going to collect the username and the password from the login form. When a user presses the login button, 
  //we are going to collect the user’s credentials with the Angular event binding.
  //Once we have the credentials, we are going to send them to the server via the HTTP POST request to the login endpoint. 
  //The server is going to validate the data. If the username and password are valid, the server will issue a JSON web token and send it back to the browser.
  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post("http://localhost:50271/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).Token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/houses"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}