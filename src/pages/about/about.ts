import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutNav {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
