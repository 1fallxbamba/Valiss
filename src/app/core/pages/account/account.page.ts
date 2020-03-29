import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userData: any = [];

  // slideOpts = {
  //   initialSlide: 0,
  //   slidesPerView: 1.7,
  //   speed: 400
  // };

  constructor(
    public storer: StorageService,
    public auth: AuthenticationService,
    public userService: UserService,
    private loader: LoadingController) { }

  ngOnInit() {

    this.storer.getUsername().then((val) => {

      this.storer.username = val;

      this.getUserData();

    });

  }

  getUserData() {

    return this.userService.getUserData(this.storer.username).subscribe((data) => {

      console.log(data);

      if (data === 'Error') {
        // notify error
      } else {

        this.userData = data;

        // console.log(this.userData.username);
      }

    });

  }

  async logOut() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Logging out...'
    });

    load.present().then(() => {
      load.dismiss().then(() => {
        return this.auth.logUserOut();
      });

    });

  }


}
