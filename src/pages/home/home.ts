import { Component } from '@angular/core';
import { NavController, FabContainer, AlertController } from 'ionic-angular';
import moment from 'moment';

import { TrendsNav } from '../trends/trends';
import { ChartsNav } from '../charts/charts';
import { ExpenseAddNav } from '../expense-add/expense-add';
import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';
import { AubergineService } from '../../services/aubergine.service';
import { WeekRange } from '../../models/week-range';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alertOptions: any = {
    title: 'Oops!',
    message: "You can't view the trends/charts yet because you haven't saved an expense yet. Care to add one?",
    buttons: ['Dismiss']
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public aubergineService: AubergineService,
  ) { }

  addExpense(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(ExpenseAddNav);
  }

  goToWeeklyExpenses() {
    let weekRangeTag = WeekRange.getWeekRangeKey(new Date());
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

  goToTrendsNav(fab: FabContainer) {
    if (this.aubergineService.expenses.length == 0) {
      this.alertCtrl.create(this.alertOptions).present();
    } else {
      fab.close();
      this.navCtrl.push(TrendsNav);
    }
  }

  goToChartsNav(fab: FabContainer) {
    if (this.aubergineService.expenses.length == 0) {
      this.alertCtrl.create(this.alertOptions).present();
    } else {
      fab.close();
      this.navCtrl.push(ChartsNav);
    }
  }

}
