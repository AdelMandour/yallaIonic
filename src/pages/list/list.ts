import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  Moods: Array<{ name: string, img: string }>;
  Places: Array<{ name: string, img: string }>;
  items;
  searchActivted;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.Moods = []
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
    this.Places = []
    this.Places.push({
      name: "coffee",
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
  }
  initializeItems() {
    this.searchActivted  = false
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }
  itemSelected(item){
    console.log(item)
  }
  placeSelected(place){
    console.log(place)
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
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.searchActivted  = false
    }
  }
}
