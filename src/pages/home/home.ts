import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SigninUserPage } from '../signin-user/signin-user';
import { PostsListPage } from '../posts-list/posts-list';
import { ToastController } from 'ionic-angular';
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
  userDetails: any;
  responseData: any;
  app;
  name
  userPostData = { "user_id": "", "token": "" };
  rate
  user
  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
    private apiServiceProvider: ApiServiceProvider,
    public alertCtrl: AlertController) {
    storage.get("user").then((userdata) => {
      if (userdata) {
        this.name = userdata.username
        this.user = userdata
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
      //console.log(data)
      this.apiData = data;
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
        this.apiServiceProvider.getRate(this.apiData[index]._id).subscribe((rateData) => {
          //console.log(rateData.rates.sumuser)
          var rating
          if (rateData.rates.sumuser == 0) {
            rating = 0
          } else {
            rating = rateData.rates.sumrates / rateData.rates.sumuser
          }
          this.apiData[index].rate = rating
          // console.log(this.apiData[index])
          this.cafes.push(this.apiData[index])
        })

      }
      if (this.apiData[index].category == 2) {
        this.apiServiceProvider.getRate(this.apiData[index]._id).subscribe((rateData) => {
          //console.log(rateData.rates.sumuser)
          var rating
          if (rateData.rates.sumuser == 0) {
            rating = 0
          } else {
            rating = rateData.rates.sumrates / rateData.rates.sumuser
          }
          this.apiData[index].rate = rating
          // console.log(this.apiData[index])
          this.rests.push(this.apiData[index])
        })
      }
      if (this.apiData[index].category == 3) {
        this.apiServiceProvider.getRate(this.apiData[index]._id).subscribe((rateData) => {
          //console.log(rateData.rates.sumuser)
          var rating
          if (rateData.rates.sumuser == 0) {
            rating = 0
          } else {
            rating = rateData.rates.sumrates / rateData.rates.sumuser
          }
          this.apiData[index].rate = rating
          // console.log(this.apiData[index])
          this.shops.push(this.apiData[index])
        })

      }
      if (this.apiData[index].category == 4) {
        this.apiServiceProvider.getRate(this.apiData[index]._id).subscribe((rateData) => {
          //console.log(rateData.rates.sumuser)
          var rating
          if (rateData.rates.sumuser == 0) {
            rating = 0
          } else {
            rating = rateData.rates.sumrates / rateData.rates.sumuser
          }
          this.apiData[index].rate = rating
          // console.log(this.apiData[index])
          this.gyms.push(this.apiData[index])
        })
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
    // console.log(item)
    this.navCtrl.push(PostsListPage, { storeId: item._id, storeName: item.name })
  }
  addToFavorite(fav) {
    var found = false
    //console.log("favfun")
    this.storage.get(this.user._id + "fav").then((value) => {
      if (value) {
        this.apiServiceProvider.getFavorites(this.user._id).subscribe((data) => {
          //console.log("data")
          data.allfavorite.forEach(element => {
            if (element.storeid._id == fav._id) {
              found = true
              //    console.log(found)
              this.showToast("Already in Favorite")
            }
          });
          if (!found) {
            //console.log("not found")
            this.apiServiceProvider.makeFavorite(fav._id, this.user.id).then((res) => {
              this.showToast("Added To Favorite")
            });
          }
        })
      } else {
        this.apiServiceProvider.makeFavorite(fav._id, this.user._id).then((res) => {
          this.storage.set(this.user.id + "fav", true)
          this.showToast("Added To Favorite")
        })

      }
    })


    // this.apiServiceProvider.makeFavorite(fav._id,this.user.id)    
    // 
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }
  onModelChange(rat, storeItem) {
    //  console.log(this.rate)
   // console.log(storeItem)
    this.apiServiceProvider.addRate(storeItem._id, this.user._id, this.rate).subscribe((res) => {
     // console.log(res)
     this.showToast("Rate Added")
    })
  }
  showToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      
    });

    toast.present();
  }
}