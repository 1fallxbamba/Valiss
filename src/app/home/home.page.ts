import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { AuthgardService } from '../core/guards/authgard.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  loginData: any = { username: '', password: '' };

  errorMessage = '';

  dismissed = false;

  newUser = true;

  constructor(
    public storer: StorageService,
    public auth: AuthenticationService,
    public guard: AuthgardService,
    private loader: LoadingController,
    private alerter: AlertController,
    private router: Router) { }

  ngOnInit() {

    this.auth.loginState = false;

    // Checks if the slider has been dismissed or not, by retrieving the value of the locally stored key
    this.storer.getWelcomeSliderStatus().then((val) => {

      if (val === 'Dismissed') {
        this.dismissed = true;
      } else {
        this.dismissed = false;
      }

    });

    // this.storer.setUsername();

    // console.log(this.storer.username);

    // this.storer.getUsername().then((val) => {

    //   this.storer.username = val;

    //   if (val) {
    //     this.newUser = false;
    //   } else {
    //     this.newUser = true;
    //   }

    // });

  }

  async dismissSlider() {  // Sets the value of the stored key to 'Dismissed' so that the welcome slider won't show up, again
    await this.storer.setWelcomeSliderStatus();
    this.dismissed = true;
  }

  async login() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Authenticating...'
    });

    load.present().then(() => {

      return this.auth.logUserIn(this.loginData).subscribe((data) => {

        load.dismiss();

        if (data === 'Connected') {

          this.errorMessage = '';

          this.storer.storeUsername(this.loginData.username);

          this.auth.loginState = true;

          this.router.navigate(['account']);

          this.initialize(this.loginData);

        } else if (data === 'Wrong password') {

          this.errorMessage = 'The password entered is incorrect !';

        } else if (data === 'User does not exist') {

          this.errorMessage = 'The username entered is incorrect !';

        } else {
          this.notify('Authentication Error.', 'An unexpected error occured while login, please try again later !');
        }

      },
        error => { // Handles any type of error that can occur, stops the loading spinner and notifies the user
          load.dismiss();
          this.notify('Connection Error.',
            'An unexpected error occured while connecting to the server, please check your internet connection and try again later !');
          // console.log(error);
        }
      );

    });

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }

  initialize(obj) {
    obj.username = '';
    obj.password = '';
  }

  // yea() {

  //   this.storer.storeUsername('tonyS');

  // }

  // see() {
  //   this.storer.getUsername().then((val) => {
  //     console.log(val);
  //   });
  // }

}
