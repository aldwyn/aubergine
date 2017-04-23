import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from 'ionic-angular';

import { ExpenseAddNav } from '../expense-add/expense-add';
import { Expense } from '../../app/models/expense';

@Component({
  selector: 'page-weekly-expense-list',
  templateUrl: 'weekly-expense-list.html',
})
export class WeeklyExpenseListNav {
  expenses: Expense[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeeklyExpenseList');
    for(let i = 0; i < 7; i++ ){
      let expense = new Expense(
        'Jollibee Dinner',
        123.45,
        'Foods & Beverages',
        'Goods',
        'Online Wallet',
        new Date()
      );
      this.expenses.push(expense);
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  presentOptions() {
    let parent = this;
    let options = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [{
        text: 'Edit',
        icon: 'ios-create',
        handler: data => {
          parent.navCtrl.push(ExpenseAddNav);
        }
      }, {
        text: 'Delete',
        icon: 'ios-trash',
        role: 'destructive',
        handler: data => {
          parent.presentDeletePrompt();
        }
      }, {
        text: 'Cancel',
        icon: 'ios-close',
        role: 'cancel'
      }],
    });
    options.present();
  }

  presentDeletePrompt() {
    let alert = this.alertCtrl.create({
      title: 'Delete Entry',
      message: 'Are you sure you want to proceed?',
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
