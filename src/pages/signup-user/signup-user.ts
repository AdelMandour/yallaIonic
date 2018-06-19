import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SigninUserPage } from '../signin-user/signin-user';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
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
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public storage: Storage) {

  }

  signup() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      // console.log(resp.coords.latitude)
      // console.log(resp.coords.longitude)
      this.userData.lat = "" + resp.coords.latitude
      this.userData.long = "" + resp.coords.longitude
      this.userData.img = "94135.jpg"
      this.userData.imgcover = "94135.jpg"
      this.apiServiceProvider.signup(this.userData).subscribe(resp => {
         console.log(resp)
         if(resp['user']){
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
         }else{
          let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: resp[0].err,
                buttons: ['Dismiss']
              });
              alert.present();
         }
        // if (resp[0].err) {
        //   let alert = this.alertCtrl.create({
        //     title: 'Error',
        //     subTitle: resp[0].err,
        //     buttons: ['Dismiss']
        //   });
        //   alert.present();
        // }
      })
    })
  }

  login() {
    //Login page link
    this.navCtrl.push(SigninUserPage);
  }


}
