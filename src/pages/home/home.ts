import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';
import { AubergineService } from '../../services/aubergine.service';
import { WeekRange } from '../../models/week-range';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public aubergineService: AubergineService,
  ) { }

  async ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Loading your expenses...',
    });
    loading.present();
    await this.aubergineService.reloadChanges();
    loading.dismiss();
  }

  goToWeeklyExpenses() {
    this.navCtrl.push(WeeklyExpenseListNav, {
      weekRangeTag: WeekRange.getWeekRangeKey(new Date())
    });
  }

}
