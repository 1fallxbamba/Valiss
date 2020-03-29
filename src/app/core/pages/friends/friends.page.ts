import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  FriendsData: any = {names: [], usernames: [], pictures: []};

  constructor(public userService: UserService, public storer: StorageService) { }

  ngOnInit() {

    this.getFriends();

    // console.log(this.FriendsData.pictures);

  }

  getFriends() {

    return this.userService.getFriends(this.storer.username).subscribe((friends) => {
      // console.log(data);
      const Friends = JSON.parse(friends);
      // console.log(this.Friends[0]);
      // console.log(this.Friends.length);

      for (let i = 0; i < Friends.length; i++) {

        this.userService.getFriendsData(Friends[i]).subscribe((friendsdata) => {
          // console.log(friendsdata['name']);
          this.FriendsData.names[i] = friendsdata['name'];
          this.FriendsData.usernames[i] = friendsdata['username'];
          this.FriendsData.pictures[i] = friendsdata['photo'];
        });

      }

    });

  }

}
