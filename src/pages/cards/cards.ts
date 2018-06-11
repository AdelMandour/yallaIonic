import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  item;
  apiData;
  constructor(private navController: NavController, private navParams: NavParams, public apiServiceProvider: ApiServiceProvider) {
      this.item = navParams.get('param1');
      console.log(this.item)
    }
  
    initializeItems() {
  

    }
    
 }
