import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {
    this.storeId = this.navParams.get('storeId');
    this.storeName = this.navParams.get('storeName');
    this.loadData()
  }

  ionViewDidLoad() {
  }
  loadData(){
    this.apiServiceProvider.getStore(this.storeId).subscribe((data) => {
      this.apiData = data;
      this.contents = this.apiData[0].contents
      this.store = this.apiData[1].store[0]
    });
  }
  itemSelected(object){

  }

}
