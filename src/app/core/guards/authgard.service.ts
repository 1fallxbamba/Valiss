import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService implements CanActivate {  // typo naming the service !

  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate() {

    if (this.auth.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }

  }

}
