import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AubergineService } from '../../services/aubergine.service';

@Component({
  selector: 'page-customize-options',
  templateUrl: 'customize-options.html',
})
export class CustomizeOptionsNav {
  paymentMethods: string[];
  categories: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public aubergineService: AubergineService,
  ) { }

  alertCategoryInfo(category) {
    this.alertCtrl.create({
      title: category.name,
      message: 'Example: ' + category.description.split('\n')
        .map(d => d.trim()).filter(d => d != '').join(', '),
      buttons: ['Dismiss'],
    }).present();
  }

}
