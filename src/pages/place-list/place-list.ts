import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the PlaceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-list',
  templateUrl: 'place-list.html',
})
export class PlaceListPage {
  placeName
  catID
  apiData
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {
    this.placeName = this.navParams.get('placeName');
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceListPage');
  }
  loadData() {
    switch (this.placeName) {
      case "cafe":
        this.catID = 1
        break;
      case "rest":
        this.catID = 2
        break;
      case "store":
        this.catID = 3
        break;
      case "gym":
        this.catID = 4
        break;
      default:
        break;
    }
    this.apiServiceProvider.getDataByCat(this.catID).subscribe((data) => {
      this.apiData = data.store;
      console.log(this.apiData)
    });
  }
  itemSelected(object){
    console.log(object.name)
  }
}
