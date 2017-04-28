import { AubergineService } from '../services/aubergine.service';

export class AppSettings {
  weeklyBudget: number = 2000;
  category: string = 'Food & Dining';
  paymentMethod: string = 'Cash';
  currencySymbol: string = 'Peso Sign';
  dailyReminder: boolean = false;
  automaticBackup: boolean = false;
}
