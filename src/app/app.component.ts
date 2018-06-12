import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignupUserPage } from '../pages/signup-user/signup-user';
import { SigninUserPage } from '../pages/signin-user/signin-user';
import { FavListPage } from '../pages/fav-list/fav-list';
//import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // title: string = 'Map';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninUserPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform/*,oauthService: OAuthService*/, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   // this.initializeApp();
  //   if (oauthService.hasValidIdToken()) {

  //     this.rootPage =HomePage;

  //   } else {

  //     this.rootPage = if(oauthService.hasValidIdToken()) {

  //     this.rootPage = SigninUserPage;

  //   } else {

  //     this.rootPage = HomePage;

  //   }

  //   platform.ready().then(() => {

  //     statusBar.styleDefault();

  //     splashScreen.hide();

  //   });

  // };

  //   }
  // }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'SigninUser', component:  SigninUserPage  },
      { title: 'SignupUser', component: SignupUserPage },
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Favorite', component: FavListPage}

    ];

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
