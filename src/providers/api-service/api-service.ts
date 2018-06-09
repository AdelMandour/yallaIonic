import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
  data;
  constructor(public http: Http) {
    console.log('Hello ApiServiceProvider Provider');
  }
  getApiUrl: string = "https://localhost:9090/stores/getall";

  
  getData() {
    return new Promise(resolve => {
      this.http.get(this.getApiUrl+'/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
