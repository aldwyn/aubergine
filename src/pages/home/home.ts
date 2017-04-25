import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import hexRgb from 'hex-rgb';

import { Expense } from '../../models/expense';
import { WeekRange } from '../../models/week-range';
import { ExpenseAddNav } from '../expense-add/expense-add';
import { AubergineService } from '../../services/aubergine.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('weeklyDonutCanvas') weeklyDonutCanvas;
  weeklyDonutChart: any;

  constructor(
    public navCtrl: NavController,
    public aubergineService: AubergineService,
  ) { }

  ngOnInit() {
    this.aubergineService.reloadChanges()
      .then(() => this.createDoughnutChart());
  }

  ionViewWillEnter() {
     this.createDoughnutChart();
  }

  createDoughnutChart() {
    let donutData = this.aubergineService.currentWeekChartData;
    let dataSum = donutData.data.reduce((a, b) => a + b, 0);
    let dataPercentages = donutData.data.map(d => Math.round((d / dataSum) * 100));
    this.weeklyDonutChart = new Chart(this.weeklyDonutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: donutData.labels,
        datasets: [{
          data: dataPercentages,
          backgroundColor: donutData.bgColors,
          hoverBackgroundColor: donutData.hoverBgColors,
        }]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
    });
  }

  addExpense() {
    this.navCtrl.push(ExpenseAddNav);
  }

}
