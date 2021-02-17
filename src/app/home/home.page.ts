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

  isNewUser = true;

  constructor(
    public storer: StorageService,
    public auth: AuthenticationService,
    public guard: AuthgardService,
    private loader: LoadingController,
    private alerter: AlertController,
    private router: Router) { }

  ngOnInit() {

    this.auth.loginState = false; // when we are on the login page it (obviously) means that no one is connected

    // Checks if the slider has been dismissed or not, by retrieving the value of the locally stored key
    this.storer.getWelcomeSliderStatus().then((val) => {

      if (val === 'Dismissed') {
        this.dismissed = true;
      } else {
        this.dismissed = false;
      }

    });

    // checks if the user is already registered then i hide the "Registration section" , it's a guard so that a user registers only once
    this.storer.getUserStatus().then((val) => {

      if (val === 'OLD') {
        this.isNewUser = false;
      } else {
        this.isNewUser = true;
      }

    });

  }

  // Sets the value of the stored key to 'Dismissed' so that the welcome slider won't show up, again
  async dismissSlider() {
    await this.storer.setWelcomeSliderStatus();
    this.dismissed = true;
  }

  async login() {

    const load = await this.loader.create({ // creates a loader
      spinner: 'circular',
      message: 'Authenticating...',
    });

    load.present().then(() => {  // shows the loader until there is no response from the API

      return this.auth.logUserIn(this.loginData).subscribe((data) => {

        load.dismiss();

        if (data === 'USC') { // if the username and password match

          this.errorMessage = '';

          /* if first wanted to make a Single User app,
          so that only the owner of the device can connect and use the app
          but i changed my mind and now with the following line anyone
          can connect from any device
           It sets the connected user to whoever is successfully connected */
          this.storer.setConnectedUser(this.loginData.username);

          this.auth.loginState = true;

          this.router.navigate(['account']);

          this.initialize(this.loginData);

        } else if (data === 'WPWD') {

          this.errorMessage = 'The password entered is incorrect !';

        } else if (data === 'UDNE') {

          this.errorMessage = 'The username entered is incorrect !';

        } else {
          this.notify('Authentication Error.', 'An unexpected error occured while login, please try again later !');
        }

      },
        error => { // Anytime you see this, it means any type of error that  occur is caught, the loader stopped and the user notified
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

}
