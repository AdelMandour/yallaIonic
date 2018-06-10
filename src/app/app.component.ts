import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CardsPage } from '../pages/cards/cards';
<<<<<<< HEAD
import { SignupUserPage } from '../pages/signup-user/signup-user';
import { SigninUserPage } from '../pages/signin-user/signin-user';

=======
import { FavListPage } from '../pages/fav-list/fav-list';
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // title: string = 'Map';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
<<<<<<< HEAD
      { title: 'Cards', component: CardsPage },
      { title: 'SignupUser', component: SignupUserPage },
      { title: 'SigninUser', component:  SigninUserPage  }
      
=======
      { title: 'Favorite', component: FavListPage}
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
