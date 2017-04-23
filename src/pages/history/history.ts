import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  data: Array<{title: string, weekRange: string, avatarData: string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    for(let i = 0; i < 7; i++ ){
      this.data.push({
        title: `Week ${i} - Week ${i+1}`,
        weekRange: 'April 12 - May 13',
        avatarData: 'Thursday',
      });
    }
  }

  openWeeklyExpenseList() {
    this.navCtrl.push(WeeklyExpenseListNav);
  }

}
