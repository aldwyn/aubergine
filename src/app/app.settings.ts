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

export class ExpenseHealth {
  static health: any = {
    zero: {
      message: "Uhm you're not starting yet, I guess.",
    },
    supercool: {
      message: "Yeah, you can spend more. :)",
    },
    cool: {
      message: "Relax, you're still cool. Keep up.",
    },
    warning: {
      message: "You're nearing danger. Tweak a little.",
    },
    danger: {
      message: "OMG! Stop spending!",
    },
    exploit: {
      message: "You have been exploiting! STOP.",
    },
  }

  static monitorHealth(amount, weeklyBudget) {
    if (amount == 0) {
      return this.health['zero'];
    } else if (amount > 0 && amount <= (0.2 * weeklyBudget)) {
      return this.health['supercool'];
    } else if (amount > (0.2 * weeklyBudget) && amount <= (0.5 * weeklyBudget)) {
      return this.health['cool'];
    } else if (amount > (0.5 * weeklyBudget) && amount <= (0.9 * weeklyBudget)) {
      return this.health['warning'];
    } else if (amount > (0.9 * weeklyBudget) && amount <= (1.25 * weeklyBudget)) {
      return this.health['danger'];
    } else {
      return this.health['exploit'];
    }
  }
}
