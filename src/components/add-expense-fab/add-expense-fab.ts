import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';

import { ExpenseAddNav } from '../../pages/expense-add/expense-add';
import { TrendsNav } from '../../pages/trends/trends';
import { ChartsNav } from '../../pages/charts/charts';

@Component({
  selector: 'add-expense-fab',
  templateUrl: 'add-expense-fab.html'
})
export class AddExpenseFab {

  constructor(public navCtrl: NavController) {}

  addExpense(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(ExpenseAddNav);
  }

  goToTrendsNav(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(TrendsNav);
  }

  goToChartsNav(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(ChartsNav);
  }

}
