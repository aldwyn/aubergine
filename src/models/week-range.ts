import moment from 'moment';

export class WeekRange {
  static getWeekRangeKey(date) {
    let dateFmt = 'YYYY-MM-DD';
    let startDate = moment(date).subtract((new Date(date)).getDay(), 'days');
    let endDate = moment(startDate).add(6, 'days');
    return `${startDate.format(dateFmt)}:${endDate.format(dateFmt)}`;
  }
} 