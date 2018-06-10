import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  item;
<<<<<<< HEAD
  constructor(private navController: NavController, private navParams: NavParams) {
     // this.item = navParams.get('param1');
=======
  apiData;
  constructor(private navController: NavController, private navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {
      this.item = navParams.get('param1');
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77
      console.log(this.item)
    }
  
    initializeItems() {
  

    }
    
 }
