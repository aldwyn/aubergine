import { WeekRange } from './week-range';

export class Expense {
  id: string;
  dateCreated: Date;
  dateModified: Date;
  weekRangeTag: string;
  rev: string;

  constructor(
    public note: string,
    public amount: number,
    public category: number,
    public paymentMethod: number,
    public date: Date,
  ) {
    this.dateCreated = this.dateModified = new Date();
    this.weekRangeTag = WeekRange.getWeekRangeKey(date);
  }
}
