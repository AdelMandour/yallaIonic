import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SigninUserPage } from '../signin-user/signin-user';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-signup-user',
  templateUrl: 'signup-user.html',
})
export class SignupUserPage { 

      responseData : any;
      userData = {"password": "", "email": "","fname":"","lname":"","phone":"","dsc":""};
    
      constructor(public navCtrl: NavController,public navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {

      }

      signup(){
        return this.apiServiceProvider.postData(this.userData,'signup')
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
        });
    
      }
    
      login(){
        //Login page link
        this.navCtrl.push(SigninUserPage);
      }


}
