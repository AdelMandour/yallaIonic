import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
//@ViewChild("fileInput")  fileInput: ElementRef;
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  formVar = { "username": "", "firstName": "", "lastName": "", "email": "", "img": "", "phone": "" }
  formData
  id
  token
  password
  constructor(
    private alertCtrl: AlertController,
    private api: ApiServiceProvider,
    private storage: Storage,
    public navCtrl: NavController, public navParams: NavParams) {
    this.formData = new FormData()
    storage.get("user").then((user) => {
      this.formVar.username = user.username
      this.formVar.firstName = user.firstname
      this.formVar.lastName = user.lastname
      this.formVar.email = user.email
      this.formVar.img = user.img
      this.formVar.phone = user.phone
      this.id = user._id
    })
    storage.get("token").then((tok) => {
      this.token = tok
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditPage');
  }
  logForm() {
    //console.log(this.formVar)
    this.presentPrompt()
  }
  onUploadChange(ev) {
    //console.log(ev.target.files)
    let myFile = ev.target.files[0];
    //let url = URL.createObjectURL(myFile);
    this.readFile(myFile);
  }
  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], { type: file.type });
      console.log("here")
      this.formData.append('file', imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
  coverImgUpload(event) {
    //console.log(ev.target.files)
    let myFile = event.target.files[0];
    //let url = URL.createObjectURL(myFile);
    this.readCover(myFile);
  }
  private readCover(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], { type: file.type });
      console.log("here")
      this.formData.append('file', imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
            alert.dismiss()
          }
        },
        {
          text: 'confirm',
          handler: data => {
            this.password = data.password
            this.formData.append("username", this.formVar.username)
            this.formData.append("firstname", this.formVar.firstName)
            this.formData.append("lastname", this.formVar.lastName)
            this.formData.append("email", this.formVar.email)
            this.formData.append("phone", this.formVar.phone)
            this.formData.append("token", this.token)
            console.log(this.password)
            this.formData.append("password", this.password)
            this.api.editUser(this.id, this.formData).subscribe((res) => {
              //  this.storage.set("user")
              console.log(res)
              this.storage.set("user",res.user)
              this.storage.set("token",res.token)
              this.navCtrl.setRoot(ProfilePage)
            })
          }
        }
      ]
    });
    alert.present();
  }


}
