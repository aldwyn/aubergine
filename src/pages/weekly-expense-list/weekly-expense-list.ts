import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  AlertController,
} from 'ionic-angular';

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
    public alertCtrl: AlertController,
    public aubergineService: AubergineService,
  ) { }

  ionViewWillEnter() {
    this.headerTitle = this.navParams.get('headerTitle');
  }

  goToExpenseDetails(expense) {
    this.navCtrl.push(ExpenseAddNav, { expense: expense });
  }

}
