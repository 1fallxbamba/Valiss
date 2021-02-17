// This service handles every operation regarding connected the user


import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';


// const remoteApiEndpoint = 'http://daavsecurite.com/yea/yeaapi/core/';

const apiEndpoint = 'http://localhost/valissapi/core/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<any> {

    return this.http.get(apiEndpoint + 'get/userdata.php?uname=' + username);

  }

  getFriends(username: string): Observable<any> {

    return this.http.get(apiEndpoint + 'get/friends.php?uname=' + username);

  }

  getFriendsData(username: string): Observable<any> {

    return this.http.get(apiEndpoint + 'get/friendsdata.php?uname=' + username);

  }

  searchUser(username: string): Observable<any> {

    return this.http.get(apiEndpoint + 'get/searchuser.php?uname=' + username);

  }

  addNewFriend(user: string, newFriend: string): Observable<any> {

    return this.http.get(apiEndpoint + 'post/json/addfriend.php?uname=' + user + '&friend=' + newFriend);

  }

}
