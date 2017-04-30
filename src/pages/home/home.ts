import { Component } from '@angular/core';
import { NavController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TrendsNav } from '../trends/trends';
import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';
import { AubergineService } from '../../services/aubergine.service';
import { WeekRange } from '../../models/week-range';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public platform: Platform,
    public storage: Storage,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public aubergineService: AubergineService,
  ) { }

  goToWeeklyExpenses() {
    this.navCtrl.push(WeeklyExpenseListNav, {
      weekRangeTag: WeekRange.getWeekRangeKey(new Date())
    });
  }

  goToTrendsPageNav() {
    this.navCtrl.push(TrendsNav);
  }

}
