import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  item;
  constructor(private navController: NavController, private navParams: NavParams) {
     // this.item = navParams.get('param1');
      console.log(this.item)
    }

 }
