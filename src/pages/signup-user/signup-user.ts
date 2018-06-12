import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SigninUserPage } from '../signin-user/signin-user';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-signup-user',
  templateUrl: 'signup-user.html',
})
export class SignupUserPage {

  responseData: any;
  userData =
    {
      "username": "",
      "email": "",
      "password": "",
      "firstname": "",
      "lastname": "",
      "phone": "",
      "lat": "",
      "long": "",
      "img": "",
      "imgcover": ""
    };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiServiceProvider: ApiServiceProvider,
    private geolocation: Geolocation,
    public alertCtrl: AlertController) {

  }

  signup() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.userData.lat = "" + resp.coords.latitude
      this.userData.long = "" + resp.coords.longitude
      this.userData.img = "94135.jpg"
      this.userData.imgcover = "94135.jpg"
      this.apiServiceProvider.signup(this.userData).then((resp)=>{
        console.log(resp[0])
        if(resp[0].err){
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: resp[0].err,
            buttons: ['Dismiss']
          });
          alert.present();
        }
    })
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  login() {
    //Login page link
    this.navCtrl.push(SigninUserPage);
  }


}
