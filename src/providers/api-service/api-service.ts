import { Http, Headers, RequestOptions } from '@angular/http';
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
  getApiUrl: string = "http://localhost:9090/stores";
  userUrl: string = "http://localhost:9090/users"
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
  getStoreData(storeID) {
    return this.http.get(this.getApiUrl + "/getstoredata/" + storeID)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  getStore(storeID) {
    return this.http.get(this.getApiUrl + "/getstore/" + storeID)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  makeFavorite(store, user) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      storeid: store,
      userid: user
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.getApiUrl + "/makefavour", data, options)
        .toPromise()
        .then((response) => {
        //  console.log('API Response : ', response.json());
          resolve(response.json());
        })
        .catch((error) => {
          // console.error('API Error : ', error.status);
          // console.error('API Error : ', JSON.stringify(error));
          reject(error.json());
        });
    });
  }
  getFavorites(userId) {
    return this.http.get(this.getApiUrl + "/favour/" + userId)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  postData(userData, page) {

  }
  login(loginData) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
      });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      email: loginData.email,
      password: loginData.password
    });
    // return new Promise((resolve, reject) => {
    return this.http.post(this.userUrl + "/login", data, options).map(res => res.json())
    //   .toPromise()
    //   .then((response) =>
    //   {
    //     console.log('API Response : ', response.json());
    //     resolve(response.json());
    //    // return response.json()
    //   })
    // });
  }

  signup(registerData) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      phone: registerData.phone,
      lat: registerData.lat,
      long: registerData.long,
      img: registerData.img,
      imgcover: registerData.imgcover
    });
    // return new Promise((resolve, reject) => {
    return this.http.post(this.userUrl + "/register", data, options).map(res => res.json())
    // .toPromise()
    // .then((response) =>
    // {
    //   //console.log('API Response : ', response.json());
    //   resolve(response.json());
    //   return response.json()
    // })
    //  });
  }
  getCollection(catID){
    let headers = new Headers();
      headers.append('Content-Type','application/json')
      headers.append('category',catID)
      let options = new RequestOptions({ headers: headers });
      return this.http.get(this.getApiUrl + "/newcollection", options).map(res => res.json())
  }
  addLike(content,stat,user){
    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      status:stat,
      userid:user
    })
    return this.http.put(this.getApiUrl + "/addlike/"+content, data, options).map(res => res.json())
  }
  getComment(postID){
    return this.http.get(this.getApiUrl + "/getfeedback/" + postID)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  addComment(storeID,userID,contentID,contentmsg){
    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      storeid:storeID,
      userid:userID,
      contentid:contentID,
      content:contentmsg
    })
    return this.http.post(this.getApiUrl + "/addfeedback", data, options).map(res => res.json())
  }
  addRate(storeID,userID,userRate){
    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      storeid:storeID,
      userid:userID,
      rate:userRate
    })
    return this.http.post(this.getApiUrl + "/addrate", data, options).map(res => res.json())
  }
  getRate(storeID){
    return this.http.get(this.getApiUrl + "/getrate/" + storeID)
      // .do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json())
  }
  editUser(id,data){
    return this.http.put(this.userUrl+"/edit/"+id,data).map(Res=>Res.json())
  }
}
