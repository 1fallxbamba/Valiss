import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  FriendsData: any = { names: [], usernames: [], pictures: [] };

  pictureLink = 'http://daavsecurite.com/yea/yeaapi/core/post/file/uploads/';

  noFriendsYet = false;

  toSend = false;

  constructor(
    public userService: UserService,
    public storer: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private alerter: AlertController,
    private loader: LoadingController) { }

  ngOnInit() {

    if (this.route.snapshot.params['to'] === 'tosend') {

      this.toSend = true;

    } else {

      this.toSend = false;

    }

    this.getFriends();

  }

  // This method fetches the friends of the user, each friend's data and stores everything in the FriendsData (L 14) variable
  async getFriends() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Loading friends...'
    });

    load.present().then(() => {

      this.userService.getFriends(this.storer.connectedUser).subscribe((result) => {

        let Friends;

        if (result !== 'UHNF' && result !== null) { // if the API returns no error AND the user has friends

          this.noFriendsYet = false;

          Friends = JSON.parse(result);

          for (let i = 0; i < Friends.length; i++) {

            this.userService.getFriendsData(Friends[i]).subscribe((friendsdata) => {

              load.dismiss();

              if (friendsdata !== 'EFFD') { // if the api returns no error while fetching the friend's data

                this.FriendsData.names[i] = friendsdata['vusr_name'];
                this.FriendsData.usernames[i] = friendsdata['vusr_username'];
                this.FriendsData.pictures[i] = friendsdata['vusr_photo'];

              } else {

                this.notify('Unexpected Error.', 'There was a problem fetching your friends, please try again');

                this.router.navigate(['account']);

              }


            },
              error => {

                load.dismiss();

                this.notify('Unexpected Error.', 'There was a problem fetching your friends, please try again');

                this.router.navigate(['account']);

              }
            );

          }

        } else { // if the user has no friends

          load.dismiss();

          this.noFriendsYet = true;

        }

      },
        error => {

          load.dismiss();

          this.notify('Connection Error.', 'There was a problem fetching your friends, check your internet and try again');

          this.router.navigate(['account']);

        }
      );

    });

  }

  goToSendPage(username: string) {

    this.router.navigateByUrl('account/sendvaliss/' + username);

  }

  goToUserPage(username: string) {

    this.router.navigateByUrl('account/userinfo/' + username + '/fromfriends');

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }


}
