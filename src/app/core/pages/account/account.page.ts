import { Component, OnInit, OnDestroy } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { rendererTypeName } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  Subs: any;

  userData: any;

  pictureLink = 'http://localhost/valissapi/core/post/file/uploads/';

  constructor(
    public storer: StorageService,
    public auth: AuthenticationService,
    public userService: UserService,
    private loader: LoadingController,
    private alerter: AlertController,
    private router: Router) { }

  ngOnInit() {

    this.getUserData();

  }

  getUserData() {

    this.storer.getConnectedUser().then(() => {

      this.userService.getUserData(this.storer.connectedUser).subscribe((data) => {

        if (data !== 'EFUD') { //  if the user's data has been fethed successfully

          this.userData = data;

        } else {

          this.notify('Unexpected Error.', 'An unexpected error happened while fetching your account data, try again later.').then(() => {

            this.router.navigate(['home']);

          });

        }

      },
        error => {
          this.notify('Connection Error.', 'An error occured while connecting to our servers, check your internet and try again');
          this.router.navigate(['home']);
        }
      );

    });

  }

  async prompt() {

    const prompt = await this.alerter.create({
      header: 'Send money to who ?',
      message: 'Who would you like to send money to ? A Friend or Another user',
      buttons: [
        {
          text: 'A Friend',
          handler: () => {
            this.router.navigate(['account/friends/tosend']);
          }
        },
        {
          text: 'Another User',
          handler: () => {
            this.router.navigate(['account/searchuser/tosend']);
          }
        }
      ]
    });
    await prompt.present();

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }


  async logOut() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Logging out...'
    });

    load.present().then(() => { //  fake loader hihihi
      load.dismiss().then(() => {
        return this.auth.logUserOut();
      });

    });

  }

  // ngOnDestroy() {

  //   this.Subs.unsubscribe();

  // }


}
