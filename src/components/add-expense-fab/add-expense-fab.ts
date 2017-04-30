import { Component } from '@angular/core';
import { NavController, FabContainer, AlertController } from 'ionic-angular';

import { AubergineService } from '../../services/aubergine.service';
import { ExpenseAddNav } from '../../pages/expense-add/expense-add';
import { TrendsNav } from '../../pages/trends/trends';
import { ChartsNav } from '../../pages/charts/charts';

@Component({
  selector: 'add-expense-fab',
  templateUrl: 'add-expense-fab.html'
})
export class AddExpenseFab {
  alertOptions: any = {
    title: 'Oops!',
    message: "You can't view the trends/charts yet because you haven't saved an expense yet. Care to add one?",
    buttons: ['Dismiss']
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public aubergineService: AubergineService
  ) {}

  addExpense(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(ExpenseAddNav);
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
