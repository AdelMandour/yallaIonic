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
  user
  likeFound = false
  commentView = false
  comments
  commentarr = []
  startindex = 0
  endindex = 5
  showLoad = false
  comment_msg
  commentlength = 0
  showback = false
  showMoreCancle = false
  constructor(
    public alertCtrl: AlertController,
    public apiServiceProvider: ApiServiceProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.post = navParams.get("post")
    this.store = navParams.get("store")
    storage.get("user").then((user) => {
      this.user = user
      // console.log("user "+this.userid)
      this.post.userslikes.forEach(element => {
        if (element == this.user._id) {
          this.likeFound = true
        }
      });
    })
    // console.log("post "+this.post._id)
    // console.log("store "+this.store._id)
    this.comments = []
    apiServiceProvider.getComment(this.post._id).subscribe((commentdata) =>{
      if(commentdata.length > 5){
        this.commentarr = commentdata
        this.commentlength = this.commentarr.length
        this.showLoad = true
        for (let index = 0; index < 5; index++) {
          this.comments.push(this.commentarr[index])          
        }
      }else{
        this.comments = commentdata
        this.commentlength = this.comments.length
      // console.log("asda")
      // console.log(this.comments)
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
      this.apiServiceProvider.addLike(this.post._id, 0, this.user._id).subscribe((data) => {
        this.post.like = this.post.like - 1
        this.post.userslikes.splice(this.post.userslikes.indexOf(this.user._id), 1)
        this.likeFound = false
      })
    } else {
      this.apiServiceProvider.addLike(this.post._id, 1, this.user._id).subscribe((data) => {
        this.post.like = this.post.like + 1
        this.post.userslikes.push(this.user._id)
        this.likeFound = true
      })
    }
  }
  comment(){
    this.commentView = true
  }
  loadmore(){
    this.showback = true
    this.startindex = this.endindex
    this.endindex = this.endindex + 5
    if(this.startindex <= this.commentarr.length){
      if(this.endindex <= this.commentarr.length){
        // console.log(this.commentarr)
        this.comments = []
        for (let index = this.startindex; index < this.endindex; index++) {
          this.comments.push(this.commentarr[index]);
          // console.log(this.comments)
        }
      }else{
        // console.log(this.commentarr[this.startindex])
        this.comments = []
        this.showMoreCancle = true
        for (let index = this.startindex; index < this.commentarr.length; index++) {
          this.comments.push(this.commentarr[index]);
          // console.log(this.comments)
        }
      }
    }
  }
  addcomment(){
    this.apiServiceProvider.addComment(this.store._id,this.user._id,this.post._id,this.comment_msg).subscribe((data) =>{
      this.commentarr.push({
        content:this.comment_msg,
        userid:{
          img:this.user.img,
          username:this.user.username
        }
      })
      this.comments.push({
        content:this.comment_msg,
        userid:{
          img:this.user.img,
          username:this.user.username
        }
      })
      this.comment_msg = ""
      this.commentlength = this.commentlength + 1
    })
  }
  loadback(){
    this.showMoreCancle = false
    this.startindex = this.startindex - 5
    this.endindex = this.endindex - 5
    if(this.startindex >= 0){
      if(this.startindex == 0){
        this.showback = false
      }
      if(this.endindex >= 5){
        // console.log(this.co
        this.comments = []
        for (let index = this.startindex; index < this.endindex; index++) {
          this.comments.push(this.commentarr[index]);
          // console.log(this.comments)
        }
      }else{
        // console.log(this.commentarr[this.startindex])
        this.comments = []
        for (let index = this.startindex; index < this.commentarr.length; index++) {
          this.comments.push(this.commentarr[index]);
          // console.log(this.comments)
        }
      }
    }
  }
}
