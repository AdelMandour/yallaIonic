import { Component, Input } from '@angular/core';
import {  NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SigninUserPage } from '../../pages/signin-user/signin-user';
import { SignupUserPage } from '../../pages/signup-user/signup-user';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { FavListPage } from '../../pages/fav-list/fav-list';
import { MyApp } from '../../app/app.component';
import { ProfilePage } from '../../pages/profile/profile';



// @IonicPage()
@Component({
  selector: 'my-header',
  templateUrl: 'myheader.html',
})
export class MyHeaderPage {
  @Input() title;
  @Input() Name;
  constructor(private storage: Storage,
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    public _myapp: MyApp,
    public alertCtrl: AlertController) {
  }
  clickmymenu() {
    this.storage.get("user").then((user) => {
      if (!user) {
        this._myapp.pages = [
          { title: 'signIn', component: SigninUserPage },
          { title: 'signUp', component: SignupUserPage },
          { title: 'New Collection', component: ListPage },
          { title: 'Stores', component: HomePage },
          { title: 'favorite', component: FavListPage },
          {title: 'profile',component: ProfilePage}
        ];
        // this.nav.setRoot(LoginPage);
      } else {
        this._myapp.pages = [
          { title: 'New Collection', component: ListPage },
          { title: 'Stores', component: HomePage },
          { title: 'Favorite', component: FavListPage },
          {title: 'profile',component: ProfilePage},
          { title: 'logout', component: SigninUserPage }
        ];
      }
    });
  }
  openprofile(){
    this.navCtrl.setRoot(ProfilePage)
  }
}