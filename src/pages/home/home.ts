import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeeklyExpenseListNav } from '../weekly-expense-list/weekly-expense-list';
import { AubergineService } from '../../services/aubergine.service';
import { WeekRange } from '../../models/week-range';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public aubergineService: AubergineService,
  ) { }

  ngOnInit() {
    this.aubergineService.reloadChanges();
  }

  goToWeeklyExpenses() {
    this.navCtrl.push(WeeklyExpenseListNav, {
      weekRangeTag: WeekRange.getWeekRangeKey(new Date())
    });
  }

}
