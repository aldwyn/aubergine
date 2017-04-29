import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import PouchDB from 'pouchdb';
import RelationalPouchDBPlugin from 'relational-pouch';
import moment from 'moment';

import { schemas } from '../schemas/aubergine.schemas';
import { AppSettings } from '../app/app.settings';
import { CATEGORIES } from '../assets/fixtures/categories.db-fixtures';
import { PAYMENT_METHODS } from '../assets/fixtures/payment-methods.db-fixtures';
import { CURRENCY_SYMBOLS } from '../assets/fixtures/currency-symbols.db-fixtures';

import { Expense } from '../models/expense';
import { Category } from '../models/category';
import { PaymentMethod } from '../models/payment-method';
import { WeekRange } from '../models/week-range';

@Injectable()
export class AubergineService {
  private _db;
  settings: AppSettings;
  expenses: Expense[] = [];
  currencySymbols: any[];
  categories: Category[];
  paymentMethods: PaymentMethod[];

  weekRanges: any[];
  weeklyBudget: number;

  // Home trackers
  dailyGroups: any[] = [];
  budgetStillHealthy: boolean = true;
  currentWeekExpenses: Expense[] = [];
  currentWeekTotal: number = 0;
  currentWeekChartData: any = {
    labels: [],
    data: [],
    bgColors: [],
    hoverBgColors: [],
  };

  constructor(public storage: Storage) {
    PouchDB.plugin(RelationalPouchDBPlugin);
    window['PouchDB'] = PouchDB;
    this.settings = new AppSettings();
    this._db = new PouchDB('aubergine.db', { adapter: 'websql' });
    this._db.setSchema(schemas);
    this._db.changes({ live: true, since: 'now', include_docs: true })
      .on('change', (change) => this.reloadChanges());
    
    this.categories = CATEGORIES;
    this.paymentMethods = PAYMENT_METHODS;
    this.currencySymbols = CURRENCY_SYMBOLS;
    
    this.loadFixtures('category', 'categories', CATEGORIES);
    this.loadFixtures('paymentMethod', 'paymentMethods', PAYMENT_METHODS);
    this.loadFixtures('currencySymbol', 'currencySymbols', CURRENCY_SYMBOLS);
    this.loadSettings();
  }

  private loadSettings() {
    this.storage.ready().then(() => {
      Object.keys(this.settings).map(async storageKey => {
        let res = await this.storage.get(storageKey);
        if (!res) {
          await this.storage.set(storageKey, this.settings[storageKey]);
        } else {
          this.settings[storageKey] = res;
        }
      });
    });
  }

  private async loadFixtures(fixtureKey, fixtureLoad, fixtureList) {
    this[fixtureLoad] = await this.list(fixtureKey);
    if (this[fixtureLoad].length == 0) {
      fixtureList.map(async fixtureInstance => {
        await this.upsert(fixtureKey, fixtureInstance);
      });
      this[fixtureLoad] = await this.list(fixtureKey);
    }
  }

  async list(ddoc) {
    let res = await this._db.rel.find(ddoc);
    return res[Object.keys(res)[0]];
  }

  async upsert(ddoc, instance) {
    await this._db.rel.save(ddoc, instance);
  }

  async delete(ddoc, instance) {
    await this._db.rel.del(ddoc, instance);
  }

  async refreshApp(refresher) {
    await this.reloadChanges();
    refresher.complete();
  }

  async reloadChanges() {
    let expenses = await this.list('expense');
    let wrKey = WeekRange.getWeekRangeKey(new Date());
    this.expenses = expenses.map((expense: Expense) => {
      expense.date = new Date(expense.date);
      expense.createdAt = new Date(expense.createdAt);
      expense.updatedAt = new Date(expense.updatedAt);
      return expense;
    });

    this.currentWeekTotal = this.expenses.map(e => e.amount).reduce((a, b) => a + b, 0);
    this.budgetStillHealthy = this.currentWeekTotal <= this.settings.weeklyBudget;
    this.loadWeekRanges();

    let currentWeekExpenses = this.expenses.filter(e => e.weekRangeTag == wrKey);
    this.dailyGroups = this.loadWeekExpenses(currentWeekExpenses);
  }

  loadWeekRanges() {
    let wrFmt = 'MMM D';
    let weekRanges = {};
    this.expenses.map(expense => {
      let key = expense.weekRangeTag;
      if (key in weekRanges) {
        weekRanges[key].sum += expense.amount;
        weekRanges[key].expenseCount += 1;
      } else {
        let wrStr = key.split(':'),
          startStr = moment(wrStr[0]),
          endStr = moment(wrStr[1]);
        weekRanges[key] = {
          key: key,
          start: startStr.toDate(),
          end: endStr.toDate(),
          name: `${startStr.format(wrFmt)} — ${endStr.format(wrFmt)}`,
          sum: expense.amount,
          expenseCount: 1,
        }
      }
    });
    this.weekRanges = Object.keys(weekRanges).map(k => weekRanges[k]);
  }

  loadWeekExpenses(weekExpenses) {
    let dailyGroups = {};
    weekExpenses.map(e => {
      let currDate = moment(e.date);
      if (currDate.day() in dailyGroups) {
        dailyGroups[currDate.day()].expenses.push(e);
      } else {
        dailyGroups[currDate.day()] = {
          name: currDate.format('dddd'),
          expenses: [e]
        };
      }
    });
    return Object.keys(dailyGroups)
      .map(k => dailyGroups[k]).reverse();
  }

}