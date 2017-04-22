import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  expenseForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
  ) { }

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

}
