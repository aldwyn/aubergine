import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from 'ionic-angular';
import moment from 'moment';

import { ExpenseAddNav } from '../expense-add/expense-add';
import { AubergineService } from '../../services/aubergine.service';

@Component({
  selector: 'page-weekly-expense-list',
  templateUrl: 'weekly-expense-list.html',
})
export class WeeklyExpenseListNav {
  dailyGroups: any[] = [];
  headerTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public aubergineService: AubergineService,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeeklyExpenseList');
  }

  ionViewWillEnter() {
    let wrKey = this.navParams.get('weekRangeTag');
    let wrFmt = 'MMM D, YYYY';
    let wrStr = wrKey.split(':'),
      startStr = moment(wrStr[0]),
      endStr = moment(wrStr[1]);
    this.headerTitle = `${startStr.format(wrFmt)} — ${endStr.format(wrFmt)}`;
    let expenses = this.aubergineService.expenses.filter(e => e.weekRangeTag == wrKey);
    this.aubergineService.dailyGroups = this.aubergineService.loadWeekExpenses(expenses);
  }

  addExpense() {
    this.navCtrl.push(ExpenseAddNav);
  }

  goToExpenseDetails(expense) {
    this.navCtrl.push(ExpenseAddNav, { expense: expense });
  }

}
