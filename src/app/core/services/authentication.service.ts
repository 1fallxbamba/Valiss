// This service handles all the Authentication

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const apiEndpoint = 'http://localhost/valissapi/core/auth/';

const remoteApiEndpoint = 'http://daavsecurite.com/yea/yeaapi/core/auth/';

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

  logUserIn(userData): Observable<any> {

    return this.http.post(remoteApiEndpoint + 'login.php', JSON.stringify(userData), httpOptions);

  }

  registerNewUser(userData): Observable<any> {

    return this.http.post(remoteApiEndpoint + 'register.php', JSON.stringify(userData), httpOptions);

  }

  validateUsername(username): Observable<any> {

    return this.http.get(remoteApiEndpoint + 'validate.php?uname=' + username);

  }

  isUserLoggedIn() {

    return this.loginState;

  }

  logUserOut() {

    this.loginState = false;

    this.router.navigate(['home']);

  }

}
