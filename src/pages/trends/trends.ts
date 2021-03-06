import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Chart } from 'chart.js';
import moment from 'moment';
import hexRgb from 'hex-rgb';

import { AubergineService } from '../../services/aubergine.service';

@Component({
  selector: 'page-trends',
  templateUrl: 'trends.html',
})
export class TrendsNav {

  @ViewChild(Slides) slides: Slides;
  @ViewChild('budgetProxTrendCanvas') budgetProxTrendCanvas;
  @ViewChild('monthlyTrendCanvas') monthlyTrendCanvas;
  budgetProxTrendChart: any;
  monthlyTrendChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aubergineService: AubergineService) {
  }

  ionViewWillEnter() {
    this.loadBudgetProximityTrends();
    this.loadMonthlyTrends();
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  loadBudgetProximityTrends() {
    let now = new Date();
    let toDate = moment(now);
    let fromDate = moment(now).subtract(6, 'months');
    let weeklyExpenses = this.aubergineService.weekRanges
      .filter(wr => wr.start >= fromDate.toDate() || wr.end <= toDate.toDate())
      .map(wr => ({ label: wr.name, amount: this.aubergineService.settings.weeklyBudget - wr.sum }))
      .reverse();
    let chartData = {
      labels: weeklyExpenses.map(wr => wr.label),
      data: weeklyExpenses.map(wr => wr.amount),
      pointColors: weeklyExpenses.map(wr => (wr.amount > 0) ? '#00ad3d': '#d00404'),
    };
    this.budgetProxTrendChart = this.createTrendChart(
      'Absolute Value on Weekly Budget', chartData, this.budgetProxTrendCanvas);
  }

  loadMonthlyTrends() {
    let monthlyExpenses = {};
    let now = new Date();
    let fromMomentDate = moment(now).subtract(11, 'months');
    let fromDate = moment(new Date(fromMomentDate.year(), fromMomentDate.month(), 1)).toDate();
    moment.monthsShort().map((m, i) => monthlyExpenses[i] = { name: m, expenses: [] });
    this.aubergineService.expenses.map(e => {
      if (e.date >= fromDate && e.date <= now) {
        monthlyExpenses[e.date.getMonth()].expenses.push(e.amount);
      }
    });
    let mKeys = Object.keys(monthlyExpenses);
    let sortedMonths = mKeys.slice(now.getMonth() + 1, mKeys.length)
      .concat(mKeys.slice(0, now.getMonth() + 1));
    let monthTrendsList = sortedMonths.map(k => monthlyExpenses[parseInt(k)]);
    let chartData = {
      labels: monthTrendsList.map(m => m.name),
      data: monthTrendsList.map(m => m.expenses.reduce((a, b) => a + b, 0)),
      pointColors: '#990066',
    };
    this.monthlyTrendChart = this.createTrendChart('Monthly Total', chartData, this.monthlyTrendCanvas);
  }

  createTrendChart(title, chartData, canvas) {
    let hr = hexRgb('#bf696e');
    return new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: title,
            data: chartData.data,
            backgroundColor: `rgba(${hr[0]}, ${hr[1]}, ${hr[2]}, 0.5)`,
            borderColor: '#990066',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: chartData.pointColors,
            pointBorderWidth: 5,
            pointHoverRadius: 9,
            pointHoverBackgroundColor: "#bf696e",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          }
        ]
      }
    });
  }

}
