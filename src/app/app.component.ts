import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
// import { SignupUserPage } from '../pages/signup-user/signup-user';
import { SigninUserPage } from '../pages/signin-user/signin-user';
// import { FavListPage } from '../pages/fav-list/fav-list';
//import { OAuthService } from 'angular-oauth2-oidc';
import { Storage } from '@ionic/storage';
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

  constructor(private storage: Storage,public platform: Platform/*,oauthService: OAuthService*/, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   this.initializeApp();
 
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
    if (page.title == "logout") {
      this.storage.set("user",null);
      this.storage.set("token",null)
      this.nav.setRoot(SigninUserPage);
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
