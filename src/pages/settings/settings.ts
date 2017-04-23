import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CustomizeOptionsNav } from '../customize-options/customize-options';
import { SendFeedbackNav } from '../send-feedback/send-feedback';
import { AboutNav } from '../about/about';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  goToCustomzeOptions() {
    this.navCtrl.push(CustomizeOptionsNav);
  }

  goToAbout() {
    this.navCtrl.push(AboutNav);
  }

  goToSendFeedback() {
    this.navCtrl.push(SendFeedbackNav);
  }

}
