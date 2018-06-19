import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SigninUserPage } from '../signin-user/signin-user';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name;
  profiledata = {"id":"","img":"","imgcover":"","username":"","email":""}
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
      storage.get("user").then((user)=>{
        if(user){
          this.name = user.username
          this.profiledata.id = user.id
          this.profiledata.img = user.img
          this.profiledata.imgcover = user.imgcover
          this.profiledata.username = user.username
          this.profiledata.email = user.email
          // console.log(this.profiledata)
        }else{
          navCtrl.setRoot(SigninUserPage)
        }
      })
  }

  ionViewDidLoad() {
  }

}
