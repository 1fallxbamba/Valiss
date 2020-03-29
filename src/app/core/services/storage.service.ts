// This service handles all the LocalStorage operations

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  username: string;

  constructor(private storage: Storage) { }

  setWelcomeSliderStatus(): Promise<any> {

    // Locally stores a value which means that the welcome slider is dismissed and will never show again
    return this.storage.set('SLIDER_STATUS', 'Dismissed');

  }

  getWelcomeSliderStatus(): Promise<any> {

    // Retrieves the value of the stored value (if the slider is dismissed or not)
    return this.storage.get('SLIDER_STATUS');

  }

  storeUsername(username): Promise<any> {

    return this.storage.set('VALISS_NAME', username);

  }

  getUsername(): Promise<any> {

    return this.storage.get('VALISS_NAME');

  }

}
