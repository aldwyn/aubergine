import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CustomizeOptionsNav } from '../customize-options/customize-options';
import { AubergineService } from '../../services/aubergine.service';
import { SendFeedbackNav } from '../send-feedback/send-feedback';
import { AboutNav } from '../about/about';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  selectedCurrencySymbol: number;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public aubergineService: AubergineService) {
  }

  ngOnInit() {
    this.selectedCurrencySymbol = this.aubergineService.settings.currencySymbol.id;
  }

  updateCurrencySymbol() {
    let currencySymbol = this.aubergineService.currencySymbols
      .filter(c => c.id == this.selectedCurrencySymbol)[0];
    this.aubergineService.settings.currencySymbol = currencySymbol;
    this.aubergineService.updateSetting();
  }

  async exportToCsv() {
    // let loading = this.loadingCtrl.create({
    //   content: 'Saving a CSV file...',
    // });
    // loading.present();
    // await this.aubergineService.exportToCsv();
    // loading.dismiss();
    this.alertCtrl.create({
      title: 'Feature shoop!',
      message: 'This feature has not been implemented yet.'
    }).present();
  }

  goToCustomizeOptions() {
    this.navCtrl.push(CustomizeOptionsNav);
  }

  goToAbout() {
    this.navCtrl.push(AboutNav);
  }

  goToSendFeedback() {
    this.navCtrl.push(SendFeedbackNav);
  }

}
