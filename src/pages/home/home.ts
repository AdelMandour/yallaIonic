import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
<<<<<<< HEAD
import { CardsPage } from '../cards/cards';
import { AlertController } from 'ionic-angular';
import { SigninUserPage } from '../signin-user/signin-user';
=======
import { PostsListPage } from '../posts-list/posts-list';
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77
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
  apiData;
<<<<<<< HEAD
  //dataList = [];
  dataList;
  //,public alertCtrl: AlertController
  constructor(public navCtrl: NavController, private apiServiceProvider: ApiServiceProvider,public alertCtrl: AlertController) {
=======
  constructor(public navCtrl: NavController, private apiServiceProvider: ApiServiceProvider) {
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77
    this.searchActivated = false;
    this.getPosts()
  }

  //start prompt
  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Sign In',
      // message: "Enter a name for this new album you're so keen on adding",
      // inputs: [
      //   {
      //     name: 'title',
      //     placeholder: 'Title'
      //   },
      // ],
      buttons: [
        {
          text: 'Sign In User',
          handler: data => {

            this.navCtrl.push(SigninUserPage);
           // [navPush]="SigninUserPage";
           // console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign In Store',
          handler: data => {
            //this.navCtrl.push(SigninStorePage);
            //console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  //end prompt
  getPosts() {
    this.apiServiceProvider.getData().subscribe((data) => {
      this.apiData = data.stores;
      this.initializeItems();
    });
  }
    initializeItems() {
    this.items = []
    this.gyms = []
    this.rests = []
    this.cafes = []
    this.shops = []
    for (let index = 0; index < this.apiData.length; index++) {
      if (this.apiData[index].category == 1) {
        this.cafes.push(this.apiData[index])
      }
      if (this.apiData[index].category == 2) {
        this.rests.push(this.apiData[index])
      }
      if (this.apiData[index].category == 3) {
        this.shops.push(this.apiData[index])
      }
      if (this.apiData[index].category == 4) {
        this.gyms.push(this.apiData[index])
      }
    }
    this.items = this.apiData;
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
      this.cat = "rest"
    }
  }
  itemSelected(item) {
    this.navCtrl.push(PostsListPage, { storeId: item._id, storeName: item.name })
  }
  addToFavorite(fav) {
    this.apiServiceProvider.makeFavorite(fav._id, "5b1cf04f4b9d4e2f94178f88")
  }
}