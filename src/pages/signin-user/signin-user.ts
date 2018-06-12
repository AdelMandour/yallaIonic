import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupUserPage } from '../signup-user/signup-user';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
//import { OAuthService } from 'angular-oauth2-oidc';
//import OktaAuth from '@okta/okta-auth-js';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin-user',
  templateUrl: 'signin-user.html'
})

export class SigninUserPage { 

  responseData : any;
  userData = {"password": "", "email": ""};

    constructor(public navCtrl: NavController, public navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {
        this.navCtrl=navCtrl;

      }


      signin(){
        this.apiServiceProvider.postData(this.userData,'signin')
        .then((result) => {
             this.responseData = result;
             if(this.responseData.userData){
             console.log(this.responseData);
             localStorage.setItem('userData', JSON.stringify(this.responseData));
             this.navCtrl.push(HomePage);
         }
         else{ console.log("User already exists"); }
       }, (err) => {
         // Error log
       }).toPromise();
   
     }

      OpenSignupUserPage(){
        this.navCtrl.push(SignupUserPage);
      }

  
}
