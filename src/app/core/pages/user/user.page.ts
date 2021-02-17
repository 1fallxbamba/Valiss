import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {

  userData: any;

  tmpFriends: any;

  pictureLink = 'http://localhost/valissapi/core/post/file/uploads/';

  isFriend = false;

  constructor(
    public user: UserService,
    public storer: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private alerter: AlertController,
    private loader: LoadingController) { }

  ngOnInit() {

    this.getUserData();

    this.checkIfFriend();

  }

  getUserData() {

    // note that here i use the searchUser method cause the getUserData method returns all of the user's data, some is not needed here
    this.user.searchUser(this.route.snapshot.params['uname']).subscribe((userData) => {

      if (userData !== 'UNF') {

        this.userData = userData[0];

      } else {

        this.notify('Fetching Error.', 'There was a problem fetching this user\'s data, please try again');

        this.router.navigate(['account']);

      }

    },
      error => {

        this.notify('Connection Error.', 'We could not connect to our servers, please check your internet connection and try again.');
        this.router.navigate(['account']);

      }
    );

  }

  async addToFriends(newFriend: string) {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Please wait...'
    });

    load.present().then(() => {

      this.user.addNewFriend(this.storer.connectedUser, newFriend).subscribe((res) => {

        load.dismiss();

        if (res !== 'FAE') {

          this.notify('New Friend Added', this.userData.vusr_name + ' has successfully been added to your friends list').then(() => {

            this.router.navigate(['account']);

          });

        } else if (res === 'FAE') {

          this.notify('Friends already exists', this.userData.vusr_name + ' is already in your Friends list');

        } else {

          this.notify('Unexpected Error.', 'An unexpected error occured while adding this user to your friends list, please try again');

        }

      },
        error => {

          load.dismiss();

          this.notify('Connection Error', `A problem occured while trying to connect to our servers, 
          please check your internet and try again`);

          this.router.navigate(['account']);

        }
      );

    });

  }

  // checks if the current user is already a Friend of the connected user or not and then displays or not the 'Add to friends' button
  checkIfFriend() {

    if (this.route.snapshot.params['from'] === 'fromfriends') {

      this.isFriend = true;

    } else {

      this.user.getFriends(this.storer.connectedUser).subscribe((result) => {

        if (result !== 'UHNF') {

          this.tmpFriends = JSON.parse(result);

          if (this.tmpFriends.includes(this.route.snapshot.params['uname'])) {

            this.isFriend = true;

          } else {

            this.isFriend = false;

          }

        } else {

          this.isFriend = false;

        }

      });

    }

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }

  ngOnDestroy() {

  }


}
