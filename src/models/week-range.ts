import moment from 'moment';

export class WeekRange {
  static getWeekRangeKey(date) {
    let dateFmt = 'YYYY-MM-DD';
    let startDate = moment(date).subtract((new Date(date)).getDay(), 'days');
    let endDate = moment(startDate).add(6, 'days');
    return `${startDate.format(dateFmt)}:${endDate.format(dateFmt)}`;
  }

  static get(date) {
    let fmt = 'MMM D, YYYY';
    let start = moment(date).subtract(date.getDay(), 'days');
    let end = moment(start).add(6, 'days');
    let name = `${start.format(fmt)} — ${end.format(fmt)}`;
    return { name: name, start: start, end: end };
  }
}
