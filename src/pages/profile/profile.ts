import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SigninUserPage } from '../signin-user/signin-user';
import { EditPage } from '../edit/edit';
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
  profiledata = { "_id": "", "img": "", "imgcover": "", "username": "", "email": "", "address": "", "firstname": "", "lastname": "", "phone": "" }
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
    storage.get("user").then((user) => {
      if (user) {
        // console.log(user)
        this.name = user.username
        this.profiledata.email = user.email
        this.profiledata.address = user.address
        this.profiledata.firstname = user.firstname
        this.profiledata.lastname = user.lastname
        this.profiledata.phone = user.phone
        this.profiledata._id = user._id
        this.profiledata.img = user.img
        this.profiledata.imgcover = user.imgcover
        this.profiledata.username = user.username
        // console.log(this.profiledata)
      } else {
        navCtrl.setRoot(SigninUserPage)
      }
    })
  }

  ionViewDidLoad() {
  }
  showEdit(){
    //console.log("edite")
    this.navCtrl.push(EditPage)
  }
}
