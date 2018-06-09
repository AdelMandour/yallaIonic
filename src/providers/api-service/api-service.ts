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
  getApiUrl: string = "http://10.140.200.166:9090/stores";
  getData() {
    return this.http.get(this.getApiUrl+"/getall")
      .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  getDataByCat(catId){
    return this.http.get(this.getApiUrl+"/getstoreofcategory/"+catId)
      .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
}
