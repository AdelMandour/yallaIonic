import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CardsPage } from '../pages/cards/cards';

import { PlaceListPage } from '../pages/place-list/place-list';
import { SignupUserPage } from '../pages/signup-user/signup-user';
import { SigninUserPage } from '../pages/signin-user/signin-user';

//import { AgmCoreModule } from '@agm/core';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiServiceProvider } from '../providers/api-service/api-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CardsPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage
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
    CardsPage,
    PlaceListPage,
    SignupUserPage,
    SigninUserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider
  ]
})
export class AppModule {}
