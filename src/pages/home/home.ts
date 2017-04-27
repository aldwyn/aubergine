import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { ExpenseAddNav } from '../expense-add/expense-add';
import { GraphPageNav } from '../graph/graph';
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

  addExpense() {
    this.navCtrl.push(ExpenseAddNav);
  }

  goToGraphNav() {
    console.log('ksjdksdf');
    this.navCtrl.push(GraphPageNav);
  }

}
