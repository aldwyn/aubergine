import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-expense-add',
  templateUrl: 'expense-add.html',
})
export class ExpenseAddNav {
  expenseForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseAdd');
  }

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      amount: [0],
      note: [],
      type: ['goods'],
      category: ['mini-expenses'],
      paymentMethod: ['cash'],
      date: [new Date().toISOString()],
    });
  }

  saveExpense() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please wait while the expense entry is being saved...'
    });

    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.pop();
    }, 3000);
  }

}
