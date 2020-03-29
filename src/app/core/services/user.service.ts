import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const remoteApiEndpoint = 'http://daavsecurite.com/yea/yeaapi/core/get/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(username): Observable<any> {

    return this.http.get(remoteApiEndpoint + 'userdata.php?uname=' + username);

  }

  getFriends(username): Observable<any> {

    return this.http.get(remoteApiEndpoint + 'friends.php?uname=' + username);

  }

  getFriendsData(username): Observable<any> {

    return this.http.get(remoteApiEndpoint + 'friendsdata.php?uname=' + username);

  }

}
