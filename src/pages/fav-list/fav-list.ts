import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiServiceProvider: ApiServiceProvider) {
  this.getFav()
  this.searchActivated = false
  }

  ionViewDidLoad() {
  }
  getFav() {
    this.favList = []
    this.apiServiceProvider.getFavorites("5b1cf04f4b9d4e2f94178f88").subscribe((data) => {
      this.favData = data.allfavorite;
      this.favData.forEach(element => {
        this.apiServiceProvider.getStore(element.storeid._id).subscribe((data) => {
          console.log(data)
          if (data[1]) {
            this.favList.push(data[1].store[0])
          } else {
            this.favList.push(data[0].store[0])
          }
        })
      });
    });
  }
  itemSelected(item){
    
  }
  initializeItems(){
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
