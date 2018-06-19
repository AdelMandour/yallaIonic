import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { PlaceListPage } from '../place-list/place-list';
import { PostsListPage } from '../posts-list/posts-list';
import { Storage } from '@ionic/storage';
import { SigninUserPage } from '../signin-user/signin-user';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items;
  searchActivated;
  apiData;
  cat: string = "rest";
  gyms: Array<{ name: string, img: string }>;
  rests: Array<{ name: string, img: string }>;
  cafes: Array<{ name: string, img: string }>;
  shops: Array<{ name: string, img: string }>;
  name
  constructor(private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public apiServiceProvider: ApiServiceProvider) {
    storage.get("user").then((user) => {
      if (user) {
        this.searchActivated  = false
    this.getPosts()
        this.name = user.username;
      } else {
        navCtrl.setRoot(SigninUserPage)
      }
    })
    
  }
  getPosts() {
    this.apiServiceProvider.getData().subscribe((data) => {
      this.apiData = data.stores;
      // console.log(this.apiData)
    // this.initializeItems();
    });
    this.apiServiceProvider.getCollection(1).subscribe((data)=>{
      this.cafes = data
      // console.log(this.cafes)
      
    })
    this.apiServiceProvider.getCollection(2).subscribe((data)=>{
      this.rests = data
      // console.log(this.rests)
    })
    this.apiServiceProvider.getCollection(3).subscribe((data)=>{
      this.shops = data
    })
    this.apiServiceProvider.getCollection(4).subscribe((data)=>{
      this.gyms = data
    })

  }
  initializeItems() {
    this.items = []
  this.items = this.apiData
}
  placeSelected(place){
    this.navCtrl.push(PlaceListPage,{placeName:place.name})
  }
  itemSelected(item) {
    // console.log(item)
    this.navCtrl.push(PostsListPage,{storeId:item['storeid']._id,storeName:item['storeid'].name})
  }
  getItems(ev) {
    // Reset items back to all of the items
   // console.log(this.items)
    this.initializeItems();
    this.searchActivated = true;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.searchActivated  = false
    }
  }
}
