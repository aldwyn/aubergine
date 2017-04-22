import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { GraphPage } from '../graph/graph';
import { HistoryPage } from '../history/history';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = GraphPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
