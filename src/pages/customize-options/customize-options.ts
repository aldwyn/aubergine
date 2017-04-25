import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomizeOptions');
    this.paymentMethods = ['Cash', 'Credit/Debit Card', 'Online Wallet', 'Others'];
    this.categories = ['Foods & Beverages', 'Mini Expenses', 'Personal & Clothing', 'Leisure'];
  }

  goBack() {
    this.navCtrl.pop();
  }

  presentEditPrompt(settingType, value) {
    let alert = this.alertCtrl.create({
      title: 'Edit Category',
      inputs: [{
        name: 'name',
        value: value
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'Save',
        handler: data => {

        }
      }],
    });
    alert.present();
  }

  presentDeletePrompt(settingType, value) {
    let alert = this.alertCtrl.create({
      title: 'Delete Category',
      message: 'Are you sure you want to proceed',
      buttons: [{
        text: 'No',
        role: 'cancel',
      }, {
        text: 'Yes',
        handler: data => {

        }
      }],
    });
    alert.present();
  }

}
