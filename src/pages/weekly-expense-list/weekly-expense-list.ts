import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from 'ionic-angular';

import { ExpenseAddNav } from '../expense-add/expense-add';
import { AubergineService } from '../../services/aubergine.service';
import { Expense } from '../../models/expense';

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
    public aubergineService: AubergineService,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeeklyExpenseList');
    
  }

  ionViewWillEnter() {
    this.loadExpenses();
  }

  loadExpenses() {
    let wrKey = this.navParams.get('weekRangeTag');
    this.aubergineService.list()
      .then(res => {
        this.expenses = res.filter(e => e.weekRangeTag == wrKey);
      });
  }

  presentOptions(expense) {
    let parent = this;
    let options = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [{
        text: 'Edit',
        icon: 'ios-create',
        handler: data => {
          parent.navCtrl.push(ExpenseAddNav, { expense: expense });
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

  addExpense() {
    this.navCtrl.push(ExpenseAddNav);
  }

}
