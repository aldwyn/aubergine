import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Ng2LetterAvatar } from '../assets/lib/ng2letteravatar';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

// Navs
import { ExpenseAddNav } from '../pages/expense-add/expense-add';
import { TrendsNav } from '../pages/trends/trends';
import { ChartsNav } from '../pages/charts/charts';
import { WeeklyExpenseListNav } from '../pages/weekly-expense-list/weekly-expense-list';
import { CustomizeOptionsNav } from '../pages/customize-options/customize-options';
import { SendFeedbackNav } from '../pages/send-feedback/send-feedback';
import { AboutNav } from '../pages/about/about';

// Page components
import { ToolbarChip } from '../components/toolbar-chip/toolbar-chip';
import { AddExpenseFab } from '../components/add-expense-fab/add-expense-fab';

// Services
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AubergineService } from '../services/aubergine.service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '49c5679e'
  }
};
const customIonicSettings: any = {
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsPlacement: 'bottom',
  pageTransition: 'ios-transition',
}

@NgModule({
  declarations: [
    Ng2LetterAvatar,
    MyApp,
    HomePage,
    HistoryPage,
    SettingsPage,
    ExpenseAddNav,
    TrendsNav,
    ChartsNav,
    WeeklyExpenseListNav,
    CustomizeOptionsNav,
    SendFeedbackNav,
    AboutNav,
    TabsPage,
    ToolbarChip,
    AddExpenseFab,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, customIonicSettings),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage,
    SettingsPage,
    ExpenseAddNav,
    TrendsNav,
    ChartsNav,
    WeeklyExpenseListNav,
    CustomizeOptionsNav,
    SendFeedbackNav,
    AboutNav,
    TabsPage,
    ToolbarChip,
    AddExpenseFab,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AubergineService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
