import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad History');
    for(let i = 0; i < 10; i++ ){
      this.data.push({
          title: 'Title '+i,
          details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          icon: 'ios-add-circle-outline',
          showDetails: false
        });
    }
  }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }

}
