import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import pounchdbFind from 'pouchdb-find';
import relationalPouch from 'relational-pouch';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import moment from 'moment';
import hexRgb from 'hex-rgb';

import { schemas } from '../schemas/aubergine.schemas';
import { CATEGORIES } from '../assets/fixtures/categories.db-fixtures';
import { CURRENCY_SIGNS } from '../assets/fixtures/currency-signs.db-fixtures';
import { PAYMENT_METHODS } from '../assets/fixtures/payment-methods.db-fixtures';

import { Expense } from '../models/expense';
import { Category } from '../models/category';
import { PaymentMethod } from '../models/paymentMethod';
import { WeekRange } from '../models/week-range';

@Injectable()
export class AubergineService {
  private _db;
  currencySigns: any[];
  categories: Category[];
  paymentMethods: PaymentMethod[];

  // History trackers
  weekRanges: any[];
  wrFmt: string = 'MMM D'
  
  // Home trackers
  currentWeekExpenses: Expense[] = [];
  currentWeekTotal: number = 0;
  currentWeekChartData: any = {
    labels: [],
    data: [],
    bgColors: [],
    hoverBgColors: [],
  };;

  initDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    PouchDB.plugin(relationalPouch);
    PouchDB.plugin(pounchdbFind);
    window['PouchDB'] = PouchDB;
    this._db = new PouchDB('aubergine.db');
    this._db.setSchema(schemas);
    this.categories = CATEGORIES;
    this.currencySigns = CURRENCY_SIGNS;
    this.paymentMethods = PAYMENT_METHODS;
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

  insert(expense) {
    return this._db.rel.save('expense', expense)
      .then(res => (res.expenses as Expense[])[0]);
  }

  update(expense) {
    // this time, it should include a non-null rev and _id
    return this._db.rel.save('expense', expense)
      .then(res => (res.expenses as Expense[])[0]);
  }

  reloadChanges() {
    return this.list()
      .then(expenses => {
        let wrKey = WeekRange.getWeekRangeKey(new Date());
        this.currentWeekExpenses = expenses.filter(e => e.weekRangeTag == wrKey);
        this.currentWeekTotal = this.currentWeekExpenses.map(e => e.amount).reduce((a, b) => a + b, 0);
        this.loadWeekRanges(expenses);
        this.loadCurrentWeekChartData(expenses);
      });
  }

  loadWeekRanges(expenses) {
    let weekRanges = {};
    expenses.map(expense => {
      let key = WeekRange.getWeekRangeKey(expense.date);
      if (key in weekRanges) {
        weekRanges[key].push(expense);
      } else {
        weekRanges[key] = [expense];
      }
    });
    this.weekRanges = Object.keys(weekRanges).map(wrKey => {
      let wrStr = wrKey.split(':'),
        startStr = moment(wrStr[0]),
        endStr = moment(wrStr[1]);
      return {
        key: wrKey,
        name: `${startStr.format(this.wrFmt)} — ${endStr.format(this.wrFmt)}`,
        sum: weekRanges[wrKey].map(e => e.amount).reduce((a, b) => (a + b), 0),
        expenseCount: weekRanges[wrKey].length,
      };
    });
    this.weekRanges;
  }

  loadCurrentWeekChartData(expenses) {
    let categoryDict = {};
    this.currentWeekExpenses.map(e => {
      if (e.category in categoryDict) {
        categoryDict[e.category] += e.amount;
      } else {
        categoryDict[e.category] = e.amount;
      }
    });

    this.currentWeekChartData.labels = [];
    this.currentWeekChartData.data = [];
    this.currentWeekChartData.bgColors = [];
    this.currentWeekChartData.hoverBgColors = [];
    
    for (let cKey in categoryDict) {
      let cat = this.categories[parseInt(cKey) - 1];
      let rgb = hexRgb(cat.color);
      this.currentWeekChartData.labels.push(cat.name);
      this.currentWeekChartData.data.push(categoryDict[cKey]);
      this.currentWeekChartData.bgColors.push(cat.color);
      this.currentWeekChartData.hoverBgColors.push(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.75)`);
    }
  }

  // loadExpensesAtWeekRange(weekRangeTag) {
  //   return this._db.createIndex({
  //      index: {
  //        fields: ['weekRangeTag'],
  //        name: 'weekRangeTagIndex',
  //      }
  //   }).then((res) => {
  //     console.log(weekRangeTag);
  //     return this._db.find({
  //       selector: { weekRangeTag: weekRangeTag },
  //     });
  //   });
  // }

}