import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import { SigninUserPage } from '../signin-user/signin-user';
import { PostsListPage } from '../posts-list/posts-list';
/**
 * Generated class for the FavListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fav-list',
  templateUrl: 'fav-list.html',
})
export class FavListPage {
  favData;
  favList;
  searchActivated
  items
  name
  user
  constructor(private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiServiceProvider: ApiServiceProvider) {
    storage.get("user").then((userdata) => {
      if (userdata) {
        this.name = userdata.username
        this.user = userdata
        this.getFav()
        this.searchActivated = false
      } else {
        navCtrl.setRoot(SigninUserPage)
      }
    })

  }

  ionViewDidLoad() {
  }
  getFav() {
    this.favList = []
    this.apiServiceProvider.getFavorites(this.user.id).subscribe((data) => {
      this.favData = data.allfavorite;
      this.favData.forEach(element => {
        if(element['storeid']){
          // console.log(element)
        this.apiServiceProvider.getStoreData(element['storeid']._id).subscribe((data) => {
          // console.log()
          this.favList.push(data.stores[0])
          /*if (data[1]) {
            data[1].store[0]._id = element['storeid']._id
            // console.log(data[1].store[0])
            this.favList.push(data[1].store[0])
          } else {
            data[0].store[0]._id = element['storeid']._id
            // console.log(data[0].store[0])
            this.favList.push(data[0].store[0])
          }*/
        })
      }
      });
    });
  }
  itemSelected(item) {
    // console.log(item)
    this.navCtrl.push(PostsListPage, { storeId: item._id, storeName: item.name })
  }
  initializeItems() {
    this.items = this.favList
  }
  getItems(ev) {
     // Reset items back to all of the items
     this.initializeItems();
     // set val to the value of the ev target
     var val = ev.target.value;
     this.searchActivated = true;
     // if the value is an empty string don't filter the items
     if (val && val.trim() != '') {
       this.items = this.items.filter((item) => {
         return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
       })
     } else {
       this.searchActivated = false;
  }
}
}
