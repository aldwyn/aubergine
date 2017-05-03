import { Component } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';
import moment from 'moment';

import { ExpenseAddNav } from '../expense-add/expense-add';
import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';
import { AubergineService } from '../../services/aubergine.service';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  weekRanges: any[] = [];
  infiniteScrollIndex = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aubergineService: AubergineService,
  ) { }

  ngOnInit() {
    this.weekRanges = this.aubergineService.weekRanges
      .slice(this.infiniteScrollIndex, this.infiniteScrollIndex + 10);
    this.infiniteScrollIndex += 10;
  }

  addExpense(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(ExpenseAddNav);
  }

  openWeeklyExpenseList(weekRangeTag) {
    let wrFmt = 'MMM D';
    let wrStr = weekRangeTag.split(':'),
      startStr = moment(wrStr[0]),
      endStr = moment(wrStr[1]);
    let expenses = this.aubergineService.expenses.filter(e => e.weekRangeTag == weekRangeTag);
    this.aubergineService.dailyGroups = this.aubergineService.loadWeekExpenses(expenses);
    this.navCtrl.push(WeeklyExpenseListNav, {
      headerTitle: `${startStr.format(wrFmt)} — ${endStr.format(wrFmt)}`,
    });
  }

  doInfinite(infiniteScroll) {
    console.log('ksjdng');
    setTimeout(() => {
      this.aubergineService.weekRanges
        .slice(this.infiniteScrollIndex, this.infiniteScrollIndex + 10)
        .map(e => this.weekRanges.push(e));
      this.infiniteScrollIndex += 10;
      infiniteScroll.complete();
    }, 1000);
  }

}
