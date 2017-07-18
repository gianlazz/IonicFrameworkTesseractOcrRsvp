import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import Tesseract from 'tesseract.js';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  @ViewChild('scannedImg') private scannedImg: ElementRef;
  private recognizedText: string;
  public tesseractResult: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private camera: Camera) { }

  launchTesseract() {
    console.log('launching the tesseract')
    Tesseract.recognize(this.scannedImg.nativeElement.src)
        .progress((progress) => {
            console.log('progress', progress);
        })
        .then((tesseractResult) => {
            console.log(tesseractResult);
            this.recognizedText = tesseractResult.text;

            let confirm = this.alertCtrl.create({
              title: 'Tesseract OCR Results:',
              message: tesseractResult.text,
              buttons: [
                {
                  text: 'Disagree',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Agree',
                  handler: () => {
                    console.log('Agree clicked');
                  }
                }
              ]
            });
            confirm.present();

        });

    };

  takePicture(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
  //      targetWidth: 1000,
  //      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });



}

}
