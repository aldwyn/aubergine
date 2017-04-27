import { WeekRange } from './week-range';

export class Expense {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  weekRangeTag: string;
  rev: string;

  constructor(
    public note: string,
    public amount: number,
    public category: number,
    public paymentMethod: number,
    public date: Date,
  ) {
    this.createdAt = this.updatedAt = new Date();
    this.weekRangeTag = WeekRange.getWeekRangeKey(date);
  }
}
