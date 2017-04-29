import { Category } from '../models/category';
import { PaymentMethod } from '../models/payment-method';
import { CurrencySymbol } from '../models/currency-symbols';


export class AppSettings {
  weeklyBudget: number = 2000;
  dailyReminder: boolean = false;
  automaticBackup: boolean = false;
  category: Category = {
    id: 7,
    name: 'Food & Dining',
    rev: null,
    color: '#c6bb1b',
    description: `
      Groceries
      Coffee shops
      Fast Food
      Restaurants
      Alchohol & Bars
    `,
  };
  paymentMethod: PaymentMethod = {
    id: 1,
    name: 'Cash',
    description: '',
    enabled: true,
    rev: null,
  };
  currencySymbol: CurrencySymbol = {
    id: 26,
    name: "Peso Sign",
    htmlCode: "&#8369;",
    rev: null,
  };
}
