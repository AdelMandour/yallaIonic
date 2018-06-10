import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupUserPage } from '../signup-user/signup-user';

@Component({
  selector: 'page-signin-user',
  templateUrl: 'signin-user.html'
})
export class SigninUserPage { 

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.navCtrl=navCtrl;
      }

      OpenSignupUserPage(){
        this.navCtrl.push(SignupUserPage);
      }
}
