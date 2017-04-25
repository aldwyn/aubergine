import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
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
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public aubergineService: AubergineService,
    public toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseAdd');
  }

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

  saveExpense() {
    let expense = new Expense(
      this.expenseForm.controls['note'].value,
      parseFloat(this.expenseForm.controls['amount'].value),
      this.expenseForm.controls['category'].value,
      this.expenseForm.controls['paymentMethod'].value,
      new Date(this.expenseForm.controls['date'].value),
    );

    if (this.expense) {
      expense.id = this.expense.id;
      expense.rev = this.expense.rev;
      this.aubergineService.update(expense)
        .then(this.afterSave.bind(this))
        .catch(console.error.bind(console));
    } else {
      this.aubergineService.insert(expense)
        .then(this.afterSave.bind(this))
        .catch(console.error.bind(console));
    }
  }

  afterSave(res) {
    this.navCtrl.pop();
    let toast = this.toastCtrl.create({
      message: 'Saved successfully.',
      duration: 3000,
      showCloseButton: true,
    });
    toast.present();
  }

}
