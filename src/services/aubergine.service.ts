import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import pounchdbFind from 'pouchdb-find';
import relationalPouch from 'relational-pouch';
import moment from 'moment';
import hexRgb from 'hex-rgb';

import { schemas } from '../schemas/aubergine.schemas';
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
  expenses: Expense[] = [];
  currencySigns: any[];
  categories: Category[];
  paymentMethods: PaymentMethod[];

  weekRanges: any[];
  wrFmt: string = 'MMM D';
  weeklyBudget: number;

  // Home trackers
  dailyGroups: any[] = [];
  currentWeekExpenses: Expense[] = [];
  currentWeekTotal: number = 0;
  currentWeekChartData: any = {
    labels: [],
    data: [],
    bgColors: [],
    hoverBgColors: [],
  };;

  initDatabase() {
    PouchDB.plugin(relationalPouch);
    PouchDB.plugin(pounchdbFind);
    window['PouchDB'] = PouchDB;
    this._db = new PouchDB('aubergine.db', { adapter: 'websql' });
    this._db.setSchema(schemas);
    this.categories = CATEGORIES;
    this.paymentMethods = PAYMENT_METHODS;
    this.currencySigns = CURRENCY_SYMBOLS;
    this.weeklyBudget = 2000;
    this.initFixtures();
    this.listenToChanges();
  }

  private initFixtures() {
    // add categories if not yet in db
    this._db.rel.find('category').then(res => {
      if (!res.categories) {
        CATEGORIES.map(category => this._db.rel.save('category', category));
      }
    });
    
    // add payment methods if not yet in db
    this._db.rel.find('paymentMethod').then(res => {
      if (!res.paymentMethods) {
        PAYMENT_METHODS.map(pm => this._db.rel.save('paymentMethod', pm));
      }
    });
  }

  private listenToChanges() {
    this._db.changes({ live: true, since: 'now', include_docs: true })
      .on('change', (change) => this.reloadChanges());
  }

  list() {
    return this._db.rel.find('expense')
      .then(res => res.expenses as Expense[]);
  }

  retrieve(id) {
    return this._db.rel.find('expense', id)
      .then(res => (res.expenses as Expense[])[0]);
  }

  upsert(expense) {
    return this._db.rel.save('expense', expense)
      .then(res => (res.expenses as Expense[])[0]);
  }

  delete(expense) {
    return this._db.rel.del('expense', expense)
      .then(res => console.log(res));
  }

  refreshApp(refresher) {
    this.reloadChanges()
      .then(() => refresher.complete());
  }

  reloadChanges() {
    return this.list()
      .then(expenses => {
        let wrKey = WeekRange.getWeekRangeKey(new Date());
        this.expenses = expenses.map((expense: Expense) => {
          expense.date = new Date(expense.date);
          expense.createdAt = new Date(expense.createdAt);
          expense.updatedAt = new Date(expense.updatedAt);
          return expense;
        });

        this.currentWeekTotal = this.expenses.map(e => e.amount).reduce((a, b) => a + b, 0);
        this.loadWeekRanges();

        let currentWeekExpenses = this.expenses.filter(e => e.weekRangeTag == wrKey);
        this.dailyGroups = this.loadWeekExpenses(currentWeekExpenses);
      });
  }

  loadWeekRanges() {
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
          name: `${startStr.format(this.wrFmt)} — ${endStr.format(this.wrFmt)}`,
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
      .map(k => dailyGroups[k])
      .reverse();
  }

}