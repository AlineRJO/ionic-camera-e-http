import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html'
})
export class FotoPage {

  public image: string;

  constructor(public navCtrl: NavController,
              public camera: Camera) {

  }

  tirarFoto(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }).then( imagemData => {
      this.image = "data:image/jpeg;base64," + imagemData;
    }, error => {
      console.log(error);
      }
    );
  }

  galeria(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM 
    }).then( imagemData => {
      this.image = "data:image/jpeg;base64," + imagemData;
    }, error => {
      console.log(error);
      }
    );
  }

}
