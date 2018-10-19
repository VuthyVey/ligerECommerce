import SimpleSchema from 'simpl-schema';

const Schemas = {};

Schemas.Orders = new SimpleSchema({
  productsList: {
    label: "Product List",
    type: Array
  },
  'productsList.$' : {
    label: "Product",
    type: Object,
    blackbox: true
  },
  totalCost : {
    type: Number,
    label: "Total Cost",
    defaultValue: 0
  }
  ,
  createdAt: {
    type: Number,
    label: "Create At",
    autoValue: function() {
      if (this.isInsert) {
        return moment().unix() //timestamp
      } else if (this.isUpsert) {
        return {
          $setOnInsert: moment().unix() // timestamp
        }
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  createdBy: {
    type: String,
    label: "Create By",
    autoValue: function() {
      return this.userId;
    }
  },
  updatedAt: {
    type: Number,
    autoValue: function() {
      if (this.isUpdate) {
        return moment().unix() // timestamp is better than iso date
      }
    },
    optional: true
  }

}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true
  }
});

export {
  Schemas
};
