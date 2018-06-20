import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  post
  store
  user
  content
  constructor(
    private apiServiceProvider: ApiServiceProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.post = navParams.get("post")
    this.store = navParams.get("store")
    storage.get("user").then((userdata) => {
      this.user = userdata
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CommentPage');
  }

}
