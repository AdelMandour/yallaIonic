import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiServiceProvider]
})
export class HomePage {
  items: Array<{ name: string, img: string }>;
  cat: string = "rest";
  gyms: Array<{ name: string, img: string }>;
  rests: Array<{ name: string, img: string }>;
  cafes: Array<{ name: string, img: string }>;
  shops: Array<{ name: string, img: string }>;
  searchActivated;
  apiData
  constructor(public navCtrl: NavController, public apiServiceProvider: ApiServiceProvider) {
    this.searchActivated = false;
    this.initializeItems();
    this.getPosts()
  }
  getPosts() {
    this.apiServiceProvider.getData().subscribe((data) => {
      this.apiData = data.stores;
      
    });
  }
  initializeItems() {
    this.items = []
    this.gyms = []
    this.rests = []
    this.cafes = []
    this.shops = []
    this.gyms.push({
      name: "gym1",
      img: "assets/imgs/img/gym1.jpg"
    });
    this.gyms.push({
      name: "gym2",
      img: "assets/imgs/img/gym2.jpg"
    });
    this.gyms.push({
      name: "gym3",
      img: "assets/imgs/img/gym3.jpg"
    });
    this.rests.push({
      name: "rest1",
      img: "assets/imgs/img/rest1.jpg"
    })
    this.rests.push({
      name: "rest2",
      img: "assets/imgs/img/rest2.jpg"
    })
    this.rests.push({
      name: "rest3",
      img: "assets/imgs/img/rest3.jpg"
    })
    this.cafes.push({
      name: "cafe1",
      img: "assets/imgs/img/cafe1.jpg"
    })
    this.cafes.push({
      name: "cafe2",
      img: "assets/imgs/img/cafe2.jpg"
    })
    this.cafes.push({
      name: "cafe3",
      img: "assets/imgs/img/cafe3.jpg"
    })
    this.shops.push({
      name: "shop1",
      img: "assets/imgs/img/shop1.jpg"
    })
    this.shops.push({
      name: "shop2",
      img: "assets/imgs/img/shop2.jpg"
    })
    this.shops.push({
      name: "shop3",
      img: "assets/imgs/img/shop3.jpg"
    })
    for (let index = 0; index < this.gyms.length; index++) {
      this.items.push(this.gyms[index]);
    }
    for (let index = 0; index < this.rests.length; index++) {
      this.items.push(this.rests[index]);
    }
    for (let index = 0; index < this.cafes.length; index++) {
      this.items.push(this.cafes[index]);
    }
    for (let index = 0; index < this.shops.length; index++) {
      this.items.push(this.shops[index]);
    }
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
      this.cat = "gym"
    }
  }
  itemSelected(item) {
    console.log(item)
  }
}
