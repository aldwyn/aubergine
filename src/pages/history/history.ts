import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ExpenseAddNav } from '../expense-add/expense-add';
import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';
import { AubergineService } from '../../services/aubergine.service';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aubergineService: AubergineService,
  ) { }

  openWeeklyExpenseList(weekRangeTag) {
    this.navCtrl.push(WeeklyExpenseListNav, { weekRangeTag: weekRangeTag });
  }

  addExpense() {
    this.navCtrl.push(ExpenseAddNav);
  }

}
