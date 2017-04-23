import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-send-feedback',
  templateUrl: 'send-feedback.html',
})
export class SendFeedbackNav {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendFeedback');
  }

}
