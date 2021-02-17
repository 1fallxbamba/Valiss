import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.page.html',
  styleUrls: ['./searchuser.page.scss'],
})
export class SearchuserPage implements OnInit {

  pictureLink = 'http://daavsecurite.com/yea/yeaapi/core/post/file/uploads/';

  username: string;

  Users: any = [];

  userNotFound = false;

  toSend = false;

  constructor(
    public user: UserService,
    public storer: StorageService,
    private alerter: AlertController,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.route.snapshot.params['to'] === 'tosend') {

      this.toSend = true;

    } else {

      this.toSend = false;

    }

  }

  // this method returns all possible users that matches a given username
  search() {

     // get the ion-spinner (loader)
    const load = document.getElementById('loader');

    // show the loader
    load.style.display = 'block';

    if ((this.username.trim()).length !== 0) { // if the search inputbox if not empty

      this.user.searchUser(this.username).subscribe((results) => {

        load.style.display = 'none'; // stop the loader

        if (results !== 'UNF') { // if user-users is-are found

          this.Users = results;

          this.userNotFound = false;

        } else {

          this.Users = [];

          this.userNotFound = true;

        }

      },
        error => {

          this.notify('Connection Error.', 'An error occurred while performing the search, check your internet and try again');

        }
      );

    } else { // if the username inputbox is empty

      load.style.display = 'none';

      this.Users = [];

    }


  }

  goToUserPage(username: string) {

    if (username === this.storer.connectedUser) { // if the connected user tries to search himself

      this.router.navigateByUrl('account/profile');  // he is redirected to his profile page instead of the UserPage

    } else {

      this.router.navigateByUrl('account/userinfo/' + username + '/fromsearch');

    }

  }

  goToSendPage(username: string) {

    if (username === this.storer.connectedUser) { // if the connected user tries to send money to himself

      this.notify('HAHAHAHAHAH', 'Who you tryna fool bro ? You can\'t do this');

    } else {

      this.router.navigateByUrl('account/sendvaliss/' + username);

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

}
