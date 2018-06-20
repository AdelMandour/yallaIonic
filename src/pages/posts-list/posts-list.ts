import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import { PostViewPage } from '../post-view/post-view';
/**
 * Generated class for the PostsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts-list',
  templateUrl: 'posts-list.html',
})
export class PostsListPage {
  storeId
  storeName
  apiData
  contents
  store
  userid
  constructor(private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiServiceProvider: ApiServiceProvider) {
    storage.get("user").then((user) => {
      this.userid = user.id
    })
    this.storeId = this.navParams.get('storeId');
    this.storeName = this.navParams.get('storeName');
    this.loadData()
  }

  ionViewDidLoad() {
  }
  loadData() {
    this.apiServiceProvider.getStore(this.storeId).subscribe((data) => {
      this.apiData = data;
      // console.log(this.apiData)
      if (this.apiData[0]) {
        var firstElement = this.apiData[0]
        this.contents = firstElement.contents
        //console.log(this.contents)
      }
      if (this.apiData[1]) {
        var secondElement = this.apiData[1]
        this.store = secondElement.store[0]
      }
    });
  }
  
  showPost(content){
    this.navCtrl.push(PostViewPage,{post:content,store:this.store})
  }

}
