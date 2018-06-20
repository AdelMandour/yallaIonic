import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { CommentPage } from '../comment/comment';
/**
 * Generated class for the PostViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-view',
  templateUrl: 'post-view.html',
})
export class PostViewPage {
  post
  store
  userid
  likeFound = false
  commentView = false
  comments
  commentarr
  startindex = 0
  endindex = 9
  constructor(
    public alertCtrl: AlertController,
    public apiServiceProvider: ApiServiceProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.post = navParams.get("post")
    this.store = navParams.get("store")
    storage.get("user").then((user) => {
      this.userid = user.id
      console.log("user "+this.userid)
      this.post.userslikes.forEach(element => {
        if (element == this.userid) {
          this.likeFound = true
        }
      });
    })
    console.log("post "+this.post._id)
    console.log("store "+this.store._id)
    apiServiceProvider.getComment(this.post._id).subscribe((commentdata) =>{
      if(commentdata.length > 5){
        this.commentarr = commentdata
        this.comments = []
        for (let index = 0; index < 5; index++) {
          this.comments.push(this.commentarr[index])          
        }
      }else{
        this.comments = commentdata
      console.log("asda")
      console.log(this.comments)
      }
    })
    //console.log(this.post)
    //console.log(this.post)
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PostViewPage');
  }
  like() {
    //console.log(content_id)
    if (this.likeFound) {
      this.apiServiceProvider.addLike(this.post._id, 0, this.userid).subscribe((data) => {
        this.post.like = this.post.like - 1
        this.post.userslikes.splice(this.post.userslikes.indexOf(this.userid), 1)
        this.likeFound = false
      })
    } else {
      this.apiServiceProvider.addLike(this.post._id, 1, this.userid).subscribe((data) => {
        this.post.like = this.post.like + 1
        this.post.userslikes.push(this.userid)
        this.likeFound = true
      })
    }
  }
  comment(){
    this.commentView = true
  }

}
