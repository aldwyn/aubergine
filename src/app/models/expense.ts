export class Expense {
  dateCreated: Date;
  dateUpdated: Date;

  constructor(
    public note: string,
    public amount: number,
    public category: string,
    public type: string,
    public paymentMethod: string,
    public date: Date,
  ) {}
}
