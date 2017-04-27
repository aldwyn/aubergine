import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Chart } from 'chart.js';

import { WeekRange } from '../../models/week-range';
import { AubergineService } from '../../services/aubergine.service';
import { WeeklyExpenseListNav } from '../../pages/weekly-expense-list/weekly-expense-list';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPageNav {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('weeklyDonutCanvas') weeklyDonutCanvas;
  @ViewChild('monthlyDonutCanvas') monthlyDonutCanvas;
  weeklyDonutChart: any;
  monthlyDonutChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aubergineService: AubergineService) {
  }

  ionViewWillEnter() {
    this.createDoughnutChart();
  }

  openWeeklyExpenseList() {
    let weekRangeTag = WeekRange.getWeekRangeKey(new Date());
    this.navCtrl.push(WeeklyExpenseListNav, { weekRangeTag: weekRangeTag });
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

  ionViewDidLoad() {
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
    this.monthlyDonutChart = new Chart(this.monthlyDonutCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [{
          label: "My First dataset",
          data: [65, 59, 80, 81, 56],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }]
      }
    });
  }

  goToSlide() {
    this.slides.slideTo(2, 800);
  }

}
