// This service handles all the LocalStorage (storing data in the internal device database system) operations

import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  connectedUser: string;

  constructor(private storage: Storage) { }

  // Locally stores a value which means that the welcome slider is dismissed and will never show again
  setWelcomeSliderStatus() {

    return this.storage.set('SLIDER_STATUS', 'Dismissed');

  }

  // Retrieves the value of the stored value (if the slider is dismissed or not)
  getWelcomeSliderStatus(): Promise<any> {

    return this.storage.get('SLIDER_STATUS');

  }
  // Sets the status of the user (new or old) to check if the user is already registered or not
  setUserStatus(status: string) {

    return this.storage.set('VALISS_USER_STATUS', status);

  }
  /// Retrieves the user status
  getUserStatus(): Promise<any> {

    return this.storage.get('VALISS_USER_STATUS');

  }

  // stores the user that is connected's username for further API operations
  setConnectedUser(username: string) {

    this.storage.set('CONNECTED_VALISS_USER', username);

  }
  // gets the username of the connected user
  async getConnectedUser(): Promise<any> {

    const val = await this.storage.get('CONNECTED_VALISS_USER');
    this.connectedUser = val;

  }

}
