import { AubergineService } from '../services/aubergine.service';

export class JsonToCsvSchemaUtil {
  static getSchema(aubergineService: AubergineService): any[] {
    let categories = {}, paymentMethods = {};
    aubergineService.categories.map(c => categories[c.id] = c.name);
    aubergineService.paymentMethods.map(pm => paymentMethods[pm.id] = pm.name);
    return [
      'id',
      'note',
      'amount',
      'date',
      'createdAt',
      'updatedAt',
      {
        label: 'category',
        value: (row, field, data) => categories[row.category]
      },
      {
        label: 'paymentMethod',
        value: (row, field, data) => paymentMethods[row.paymentMethod]
      },
    ];
  }
}
