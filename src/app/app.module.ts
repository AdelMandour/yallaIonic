import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { SignupUserPage } from '../pages/signup-user/signup-user';
import { SigninUserPage } from '../pages/signin-user/signin-user';

//import { AgmCoreModule } from '@agm/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiServiceProvider } from '../providers/api-service/api-service';

import { PlaceListPage } from '../pages/place-list/place-list';
import { PostsListPage } from '../pages/posts-list/posts-list';
import { FavListPage } from '../pages/fav-list/fav-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage,
    PostsListPage,
    FavListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  //   AgmCoreModule.forRoot({
  //    apiKey: 'AIzaSyARP_rGAxnm5haEe88zKlNfEl9TmPUbGfs'
  //  }),
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage,
    PostsListPage,
    FavListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider
  ]
})
export class AppModule {}
