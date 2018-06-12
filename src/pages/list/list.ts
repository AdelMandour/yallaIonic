import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { PlaceListPage } from '../place-list/place-list';
import { PostsListPage } from '../posts-list/posts-list';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  Places: Array<{ name: string, img: string }>;
  items;
  searchActivted;
  apiData;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {
    this.searchActivted  = false
    this.getPosts()
  }
  getPosts() {
    this.apiServiceProvider.getData().subscribe((data) => {
      this.apiData = data.stores;
      this.initializeItems();
    });
  }
  initializeItems() {
    this.Places = []
    this.items = []
    this.Places.push({
      name: "cafe",
      img: "assets/imgs/img/coffee.png"
    });
    this.Places.push({
      name: "rest",
      img: "assets/imgs/img/rest.png"
    });
    this.Places.push({
      name: "store",
      img: "assets/imgs/img/store.png"
    });
    this.Places.push({
      name: "gym",
      img: "assets/imgs/img/gym.png"
    });
    this.items = this.apiData
  }
  placeSelected(place){
    this.navCtrl.push(PlaceListPage,{placeName:place.name})
  }
  itemSelected(item) {
    this.navCtrl.push(PostsListPage,{storeId:item._id,storeName:item.name})
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    this.searchActivted = true;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.searchActivted  = false
    }
  }
}
