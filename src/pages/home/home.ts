import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { ExpenseAddNav } from '../expense-add/expense-add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('weeklyDonutCanvas') weeklyDonutCanvas;
  weeklyDonutChart: any;

  constructor(public navCtrl: NavController) { }

  addExpense() {
    this.navCtrl.push(ExpenseAddNav);
  }

  ngOnInit() {
    this.weeklyDonutChart = new Chart(this.weeklyDonutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'No. of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          hoverBackgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56",
            "#FF6384", "#36A2EB", "#FFCE56"
          ]
        }]
      }
    });
  }

}
