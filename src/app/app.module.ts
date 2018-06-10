import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { PlaceListPage } from '../pages/place-list/place-list';
import { SignupUserPage } from '../pages/signup-user/signup-user';
import { SigninUserPage } from '../pages/signin-user/signin-user';

//import { AgmCoreModule } from '@agm/core';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiServiceProvider } from '../providers/api-service/api-service';
<<<<<<< HEAD

=======
import { PlaceListPage } from '../pages/place-list/place-list';
import { PostsListPage } from '../pages/posts-list/posts-list';
import { FavListPage } from '../pages/fav-list/fav-list';
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
<<<<<<< HEAD
    CardsPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage
=======
    PlaceListPage,
    PostsListPage,
    FavListPage
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
<<<<<<< HEAD
    CardsPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage,
=======
    PlaceListPage,
    PostsListPage,
    FavListPage
>>>>>>> cc081a8cf2c9aaf477bf5d4079f585e20c2a4f77
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider
  ]
})
export class AppModule {}
