import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { CurrencySymbol } from '../../models/currency-symbols';
import { CustomizeOptionsNav } from '../customize-options/customize-options';
import { AubergineService } from '../../services/aubergine.service';
import { SendFeedbackNav } from '../send-feedback/send-feedback';
import { AboutNav } from '../about/about';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  selectedCurrencySymbol: CurrencySymbol;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public aubergineService: AubergineService) {
  }

  ngOnInit() {
    this.selectedCurrencySymbol = this.aubergineService.settings.currencySymbol;
  }

  updateCurrencySymbol() {
    this.aubergineService.settings.currencySymbol = this.selectedCurrencySymbol;
    this.aubergineService.updateSetting('currencySymbol');
  }

  async exportToCsv() {
    let loading = this.loadingCtrl.create({
      content: 'Saving a CSV file...',
    });
    loading.present();
    await this.aubergineService.exportToCsv();
    loading.dismiss();
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
