import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import moment from 'moment';
import hexRgb from 'hex-rgb';

import { AubergineService } from '../../services/aubergine.service';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsNav {

  @ViewChild(Slides) slides: Slides;
  @ViewChild('weeklyDonutCanvas') weeklyDonutCanvas;
  @ViewChild('nDaysDonutCanvas') nDaysDonutCanvas;
  weeklyDonutChart: any;
  nDaysDonutChart: any;
  selectedWeek: string;
  selectedNDays: number = 30;
  allowedNDays: any[] = [
    { days: 15, name: 'For the last 10 days' },
    { days: 30, name: 'For the last month (30 days)' },
    { days: 60, name: 'For the last 2 months (60 days)' },
    { days: 60, name: 'For the last quarter (90 days)' },
    { days: 183, name: 'For half a year' },
    { days: 365, name: 'For a year' },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public aubergineService: AubergineService) {
  }

  ionViewDidLoad() {
    if (this.aubergineService.weekRanges) {
      let lastWeekRange = this.aubergineService.weekRanges[0];
      this.selectedWeek = lastWeekRange.key;
    }
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Loading your expenses...',
    });
    loading.present();
    this.loadWeekChart();
    this.loadLastNDaysChart();
    loading.dismiss();
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  loadWeekChart() {
    let weekExpenses = this.aubergineService.expenses
      .filter(e => e.weekRangeTag == this.selectedWeek);
    let weekChartData = this.categorizeExpenses(weekExpenses);
    this.weeklyDonutChart = this.createDoughnutChart(weekChartData, this.weeklyDonutCanvas);
  }

  loadLastNDaysChart() {
    let toDate = new Date();
    let fromDate = moment(toDate).subtract(this.selectedNDays, 'days').toDate();
    let lastNDaysExpenses = this.aubergineService.expenses
      .filter(e => e.date >= fromDate && e.date <= toDate);
    let nDaysChartData = this.categorizeExpenses(lastNDaysExpenses);
    this.nDaysDonutChart = this.createDoughnutChart(nDaysChartData, this.nDaysDonutCanvas);
  }

  categorizeExpenses(expenses) {
    let categoryDict = {};
    let chartData = {
      labels: [],
      data: [],
      bgColors: [],
      hoverBgColors: [],
    };
    
    expenses.map(e => {
      if (e.category in categoryDict) {
        categoryDict[e.category] += e.amount;
      } else {
        categoryDict[e.category] = e.amount;
      }
    });
    
    for (let cKey in categoryDict) {
      let cat = this.aubergineService.categories[parseInt(cKey) - 1];
      let rgb = hexRgb(cat.color);
      chartData.labels.push(cat.name);
      chartData.data.push(categoryDict[cKey]);
      chartData.bgColors.push(cat.color);
      chartData.hoverBgColors.push(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.75)`);
    }
    return chartData;
  }

  createDoughnutChart(chartData, canvas) {
    return new Chart(canvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          backgroundColor: chartData.bgColors,
          hoverBackgroundColor: chartData.hoverBgColors,
        }]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
    });
  }

}
