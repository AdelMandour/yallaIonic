import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SigninUserPage } from '../signin-user/signin-user';
import { PostsListPage } from '../posts-list/posts-list';

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
  //dataList = [];
  dataList;
  userDetails : any;
  responseData: any;
  app;
  name
  userPostData = {"user_id":"","token":""};

  constructor(private storage: Storage,
    public navCtrl: NavController, 
    private apiServiceProvider: ApiServiceProvider,
    public alertCtrl: AlertController) {
    storage.get("user").then((user) => {
      if (user) {
        this.name = user.username
        this.searchActivated = false;
        this.getPosts();
      } else {
        navCtrl.setRoot(SigninUserPage)
      }
    })
    

   /* const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;*/
  }//End Constructor

  //start prompt
  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Sign In',
      buttons: [
        {
          text: 'Sign In User',
          handler: data => {
            this.navCtrl.push(SigninUserPage);
           // console.log('Cancel clicked');
          }
        }//,
        // {
        //   text: 'Sign In Store',
        //   handler: data => {
        //     //this.navCtrl.push(SigninStorePage);
        //     //console.log('Saved clicked');
        //   }
        // }
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

  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
 }
 
 logout(){
      localStorage.clear();
      setTimeout(() => this.backToWelcome(), 1000);
 }
 
}