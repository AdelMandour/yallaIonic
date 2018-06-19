import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupUserPage } from '../signup-user/signup-user';
import { HomePage } from '../home/home';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
//import { OAuthService } from 'angular-oauth2-oidc';
//import OktaAuth from '@okta/okta-auth-js';
//import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-signin-user',
  templateUrl: 'signin-user.html'
})

export class SigninUserPage {

  responseData: any;
  userData = {
    "email": "",
    "password": ""
  };
  userStorage = {
    "id": "",
    "email": "",
    "username": "",
    "img": "",
    "imgcover": ""
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiServiceProvider: ApiServiceProvider,
    public alertCtrl: AlertController,
    public storage: Storage) {

    //   this.navCtrl = navCtrl;
    storage.get('user').then((value) => {
      if (value != null) {
        navCtrl.setRoot(ListPage)
      }
    })

  }

  signin() {
   // console.log(this.userData)
    this.apiServiceProvider.login(this.userData).subscribe(resp => {
      if (resp.user) {
        this.userStorage.id = resp.user['_id']
        this.userStorage.email = resp.user['email']
        this.userStorage.username = resp.user['username']
        this.userStorage.img = resp.user['img']
        this.userStorage.imgcover = resp.user['imgcover']
        //  console.log(this.userStorage)
        //  console.log(resp.token)  
        this.storage.set('user', this.userStorage)
        this.storage.set('token', resp.token)
        this.navCtrl.setRoot(ListPage)
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: resp[0].err,
          buttons: ['Dismiss']
        });
        alert.present();
      }

    })
    // this.apiServiceProvider.login(this.userData).then((resp) => {
    //   console.log(resp) 

    // })
    //   .catch((error) => {

    //   });

  }//endd signin()

  OpenSignupUserPage() {
    this.navCtrl.push(SignupUserPage);
  }


}
