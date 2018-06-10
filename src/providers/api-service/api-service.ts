import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
  data;
  constructor(public http: Http) {
  }
  getApiUrl: string = "http://10.140.200.166:9090/stores";
  getData() {
    return this.http.get(this.getApiUrl + "/getall")
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  getDataByCat(catId) {
    return this.http.get(this.getApiUrl + "/getstoreofcategory/" + catId)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  getLikes() {
    return this.http.get(this.getApiUrl + "/getstoreofcategory/")
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  getComments() {
    return this.http.get(this.getApiUrl + "/getstoreofcategory/")
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  getStore(storeID) {
    return this.http.get(this.getApiUrl + "/getstore/" + storeID)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  makeFavorite(store,user) {
    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      storeid: store,
      userid: user
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.getApiUrl+"/makefavour", data, options)
      .toPromise()
      .then((response) =>
      {
       // console.log('API Response : ', response.json());
        resolve(response.json());
      })
      .catch((error) =>
      {
       // console.error('API Error : ', error.status);
       // console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
      });
    });
  }
  getFavorites(userId){
    return this.http.get(this.getApiUrl + "/favour/" + userId)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
}
