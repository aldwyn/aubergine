import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {
  @ViewChild('weeklyDonutCanvas') weeklyDonutCanvas;
  @ViewChild('monthlyDonutCanvas') monthlyDonutCanvas;
  weeklyDonutChart: any;
  monthlyDonutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
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

}
