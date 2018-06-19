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
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { MyHeaderPage } from '../components/myheader/myheader';
import { ProfilePage } from '../pages/profile/profile';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage,
    MyHeaderPage,
    PostsListPage,
    FavListPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__yalla',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
        

    })
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
    FavListPage,
    MyHeaderPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    Geolocation,
    MyHeaderPage
  ]
})
export class AppModule {}
