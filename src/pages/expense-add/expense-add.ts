import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController,
} from 'ionic-angular';

import { AubergineService } from '../../services/aubergine.service';
import { Expense } from '../../models/expense';

@Component({
  selector: 'page-expense-add',
  templateUrl: 'expense-add.html',
})
export class ExpenseAddNav {
  expenseForm: FormGroup;
  expense: Expense;
  operation: string = 'add';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public aubergineService: AubergineService,
  ) { }

  ngOnInit() {
    this.expense = this.navParams.get('expense');
    if (this.expense) {
      this.createForm(this.expense);
    } else {
      this.createForm(new Expense('', 0, 7, 1, new Date()));
    }
  }

  private createForm(expense) {
    this.expenseForm = this.formBuilder.group({
      amount: [expense.amount],
      note: [expense.note],
      category: [expense.category],
      paymentMethod: [expense.paymentMethod],
      date: [(new Date(expense.date)).toISOString()],
    });
  }

  validateAndSaveExpense() {
    let formCtrl = this.expenseForm.controls;
    if (parseFloat(formCtrl.amount.value) <= 0) {
      this.alertCtrl.create({
        message: 'The amount must be at least 0.',
        buttons: ['Dismiss'],
      }).present();
    } else if ((new Date(formCtrl.date.value)) > (new Date())) {
      this.alertCtrl.create({
        message: 'The date must be not beyond today.',
        buttons: ['Dismiss'],
      }).present();
    } else {
      this.saveExpense(formCtrl);
    }
  }

  private async saveExpense(formCtrl) {
    let expense = new Expense(
      formCtrl.note.value,
      parseFloat(formCtrl.amount.value),
      formCtrl.category.value,
      formCtrl.paymentMethod.value,
      new Date(formCtrl.date.value),
    );
    if (this.expense) {
      expense.id = this.expense.id;
      expense.rev = this.expense.rev;
    }
    let loading = this.loadingCtrl.create({
      content: 'Saving...',
    });
    loading.present();
    await this.aubergineService.upsert('expense', expense);
    this.aubergineService.reloadChanges();
    loading.dismiss();
    this.navCtrl.pop();
    this.toastCtrl.create({
      message: 'Saved successfully.',
      duration: 3000,
      showCloseButton: true,
    }).present();
  }

  presentDeletePrompt() {
    this.alertCtrl.create({
      title: 'Delete Entry',
      message: 'Are you sure you want to proceed anyway?',
      buttons: [{
        text: 'No',
        role: 'cancel',
      }, {
        text: 'Yes',
        handler: async data => {
          this.loadingCtrl.create({
            content: 'Please wait while the deletion is on process...',
            duration: 1500,
            dismissOnPageChange: true,
          }).present();
          await this.aubergineService.delete('expense', this.expense);
          this.aubergineService.reloadChanges();
        }
      }],
    }).present();
  }

}
