import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { PlaceListPage } from '../place-list/place-list';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  Moods: Array<{ name: string, img: string }>;
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
    this.Moods = []
    this.Places = []
    this.items = []
    this.Moods.push({
      name: "alone",
      img: "assets/imgs/img/alone.png"
    });
    this.Moods.push({
      name: "couple",
      img: "assets/imgs/img/couple.png"
    });
    this.Moods.push({
      name: "friends",
      img: "assets/imgs/img/friends.png"
    });
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
  moodSelected(item){
    console.log("itemselected"+item.name)
  }
  placeSelected(place){
    this.navCtrl.push(PlaceListPage,{placeName:place.name})
  }
  itemSelected(item) {
    console.log(item.name)
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
