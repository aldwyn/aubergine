export const AubergineSchemas: any[] = [
  {
    singular: 'expense',
    plural: 'expenses',
    relations: {
      paymentMethod: {
        belongsTo: {
          type: 'paymentMethod',
          async: true,
        }
      },
      category: {
        belongsTo: {
          type: 'category',
          async: true,
        }
      },
    }
  },
  {
    singular: 'paymentMethod',
    plural: 'paymentMethods',
    relations: {
      expenses: {
        hasMany: 'expense'
      }
    }
  },
  {
    singular: 'category',
    plural: 'categories',
    relations: {
      expenses: {
        hasMany: 'expense'
      }
    }
  },
  {
    singular: 'currencySymbol',
    plural: 'currencySymbols',
  },
  {
    singular: 'appSettings',
    plural: 'appSettings',
  }
];