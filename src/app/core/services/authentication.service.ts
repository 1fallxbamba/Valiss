// This service handles all the Authentication operations

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


const apiEndpoint = 'http://localhost/valissapi/core/auth/';

// const remoteApiEndpoint = 'http://daavsecurite.com/yea/yeaapi/core/auth/';

const httpOptions = {

  headers: new HttpHeaders({
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  loginState = false;

  isUserLoggedIn() {

    return this.loginState;

  }

  logUserIn(userData: any): Observable<any> {

    return this.http.post(apiEndpoint + 'login.php', JSON.stringify(userData), httpOptions);

  }

  registerNewUser(userData: any): Observable<any> {

    return this.http.post(apiEndpoint + 'register.php', JSON.stringify(userData), httpOptions);

  }

  validateUsername(username: string): Observable<any> {

    return this.http.get(apiEndpoint + 'validate.php?uname=' + username);

  }

  logUserOut() {

    this.loginState = false;

    this.router.navigate(['home']);

  }

}
