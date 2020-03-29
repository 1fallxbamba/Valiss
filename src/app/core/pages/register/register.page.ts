import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';

import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  base64Img = '';

  errorMessage = '';

  imagePosterEndpoint = 'http://localhost/valissapi/core/post/file/image.php';
  rimagePosterEndpoint = 'http://daavsecurite.com/yea/yeaapi/core/post/file/image.php';

  registerForm: FormGroup;

  usernameAvailable = true;

  trustServer = true;

  newUserData = { firstName: '', lastName: '', address: '', email: '', phone: '', username: '', password: '', profilePic: '' };

  errorMessages = {

    first_name: {
      required: 'Name is required',
      minlength: 'Name is too short'
    },
    last_name: {
      required: 'Name is required',
      minlength: 'Name is too short'
    },
    address: {
      required: 'Address is required',
      minlength: 'Address is too short'
    },
    email: {
      required: 'Email is required',
      email: 'Email is invalid'
    },
    phone: {
      required: 'Phone is required',
      pattern: 'Phone is invalid'
    },
    username: {
      required: 'Username is required',
      minlength: 'Username is too short'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password should contain at least 8 characters',
      pattern: 'Password should contain at least an uppercase character'
    }

  };

  constructor(
    public storer: StorageService,
    public auth: AuthenticationService,
    private router: Router,
    private loader: LoadingController,
    private alerter: AlertController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private transferer: FileTransfer) {

    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^.{9}$')]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{8,}')]]
    });

  }

  ngOnInit() {} // add internet conncection verification

  async register() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Processing...'
    });

    const picName = 'USER__' + this.newUserData.username + '.jpg';

    if (this.base64Img !== '') {

      this.newUserData.profilePic = picName;

    } else {

      this.newUserData.profilePic = 'default.jpg';

    }

    const fileTransferer: FileTransferObject = this.transferer.create();

    const options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: picName,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      headers: {
        Connection: 'close'
      }
    };

    load.present().then(() => {

      return this.auth.registerNewUser(this.newUserData).subscribe((data) => {

        if (data === 'New user successfully registered') {

          // this.storer.storeUsername(this.newUserData.username);

          if (this.base64Img !== '') {

            fileTransferer.upload(this.base64Img, encodeURI(this.rimagePosterEndpoint), options, this.trustServer).then(() => {

              load.dismiss();

              this.notify('Success !', `You are successfully registered.`);

              this.initialize(this.newUserData);

              this.router.navigate(['/home']);

            }, error => {
              load.dismiss();
              this.notify('1/2 success !',
                'You are registed but an unexcpected error happened while uploading the picture, you can add the picture later :).');
              this.initialize(this.newUserData);
              this.router.navigate(['/home']);
            });

          } else {

            load.dismiss();

            this.notify('Success !', 'You are successfully registered, you can add a profile picture later :)');

            this.initialize(this.newUserData);

            this.router.navigate(['/home']);

          }


        } else if (data === 'Error') {

          load.dismiss();
          this.notify('Error1', 'An unexpected error occured while registering, try again later');
          // this.router.navigate(['/home']);

        } else {
          load.dismiss();
          this.notify('Error2', 'An unexpected error occured while registering, try again later');
          // this.router.navigate(['/home']);
        }

      },
        error => {
          load.dismiss();
          this.notify('Error3', 'An unexpected error occured while registering, try again later');
          // this.router.navigate(['/home']);
        }
      );

    });

  }

  checkUsername() {

    this.auth.validateUsername(this.newUserData.username).subscribe((data) => {

      if (data === 'Not available') {

        this.usernameAvailable = false;

        this.errorMessage = 'The username is not available !';

      } else {

        this.usernameAvailable = true;

        this.errorMessage = '';

      }

    },
      error => {
        this.notify('Connection Error.', 'Unable to verify the availability of the username, check your internet and try again later'),
          this.router.navigate(['/home']);
      }
    );

  }

  throwValidationError(field: string) {

    const control = this.registerForm.controls[field];

    for (const validator in control.errors) {
      if (control.errors[validator]) {
        return this.errorMessages[field][validator];
      }
    }
    return null;

  }

  selectPictureFromGallery() {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
    this.camera.getPicture(options).then((ImageData => {
      this.base64Img = 'data:image/jpeg;base64,' + ImageData;
    }), error => {
      console.log(error); // change to notify, later
    });

  }

  takePictureFromCamera() {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((ImageData => {
      this.base64Img = 'data:image/jpeg;base64,' + ImageData;
    }), error => {
      console.log(error); // change to notify, later
    });

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }

  initialize(obj) {
    obj.firstName = '';
    obj.lastName = '';
    obj.address = '';
    obj.email = '';
    obj.phone = '';
    obj.username = '';
    obj.password = '';
  }


}
