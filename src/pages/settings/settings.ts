import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { File as IonicFile } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import jsonCsvConverter from 'json-2-csv';

import { WeekRange } from '../../models/week-range';
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
  alertOptions: any = {
    title: 'Oops!',
    message: "You can't import/export yet because you haven't saved an expense yet.",
    buttons: ['Dismiss']
  };

  constructor(
    public file: IonicFile,
    public filePath: FilePath,
    public fileChooser: FileChooser,
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
  }

  async importFromCsv() {
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      buttons: ['Dismiss']
    });
    try {
      let uri = await this.fileChooser.open();
      if (uri.endsWith('.csv')) {
        let nativePath = await this.filePath.resolveNativePath(uri);
        let dirSplit = nativePath.split('/');
        let fileName = dirSplit[dirSplit.length - 1];
        try {
          let csvData = await this.file.readAsText(nativePath.replace(fileName, ''), fileName);
          let expenseDict = this.aubergineService.loadExpenseDict();
          jsonCsvConverter.csv2json(csvData, (err, expenses) => {
            let filteredExpenses = expenses.filter(e => !(e.id in expenseDict));
            filteredExpenses.map(async e => {
              e.id = null;
              e.rev = null;
              e.category = parseInt(e.category);
              e.paymentMethod = parseInt(e.paymentMethod);
              e.amount = parseFloat(e.amount);
              e.date = new Date(e.date);
              e.createdAt = new Date(e.createdAt);
              e.updatedAt = new Date(e.updatedAt);
              if (!e.weekRangeTag) {
                e.weekRangeTag = WeekRange.getWeekRangeKey(e.date);
              }
              await this.aubergineService.upsert('expense', e);
            });
            alert.setTitle('Success!');
            alert.setMessage(`There are ${filteredExpenses.length} expenses that has been exported.`);
            alert.present();
          });
        } catch (e) {
          alert.setMessage(`Something went wrong on reading the file:\n${e.message}`);
          alert.present();
        }
      } else {
        alert.setMessage('It should be a legit Aubergine CSV file.');
        alert.present();
      }
    } catch (e) {
      alert.setMessage(`Something went wrong on picking a file:\n${e.message}`);
      alert.present();
    }
  }

  async exportToCsv() {
    if (this.aubergineService.expenses.length == 0) {
      this.alertCtrl.create(this.alertOptions).present();
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Saving a CSV file...',
      });
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        buttons: ['Dismiss']
      });
      loading.present();
      jsonCsvConverter.json2csv(this.aubergineService.expenses, (err, csv) => {
        loading.dismiss();
        if (err) {
          alert.setMessage(err.message);
          alert.present();
        } else {
          this.file.writeFile(
            this.file.externalRootDirectory, 'aubergine.backup.csv', csv, { replace: true })
            .then(res => {
              alert.setTitle('Success!');
              alert.setMessage('The backup of your expenses has been saved.');
              alert.present();
            });
        }
      });
    }
  }

  promptWeeklyBudgetChange() {
    this.alertCtrl.create({
      title: 'Change Weekly Budget',
      inputs: [{
        name: 'weeklyBudget',
        placeholder: 'Enter amount...',
        value: this.aubergineService.settings.weeklyBudget.toString(),
        type: 'number',
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Change',
        handler: data => {
          this.aubergineService.settings.weeklyBudget = data.weeklyBudget;
          this.aubergineService.updateSetting();
        }
      }]
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
