// look at https://atmospherejs.com/aldeed/collection2 and https://github.com/aldeed/simple-schema-js

import SimpleSchema from 'simpl-schema';
import { Categories } from '/imports/api/categories/categories.js';

const Schemas = {};

var categoriesList = Categories.find({}).fetch();
  categoriesList = categoriesList.map(function (doc) {
  return doc.slug;
});

Schemas.Name = new SimpleSchema({
  english: {
    type: String,
    unique: true
  },
  khmer: {
    type: String,
    unique: true
  }
});

Schemas.Products = new SimpleSchema({
  name: {
    type: Schemas.Name
  },
  regularPrice: {
    type: Number,
    label: "Regular Price",
    min: 0,
    optional: true
  },
  salePrice: {
    type: Number,
    label: "Sale Price",
    min: 0.01
  },
  unit: {
    type: String,
    label: "Unit",
    allowedValues: function() {
      return ['kg', 'gram', 'bun', 'pack']
    }
  },
  min: {
    type: Number,
    label: "Mininum",
    min: 0.01,
    defaultValue: 0.01
  },
  step: {
    type: Number,
    label: "Step",
    min: 0.01,
    regEx: "\d+(\.\d{1,2})?" // two decimal regEx
  },
  categories: {
    type: Array,
    label: "Categories"
  },
  'categories.$': {
    type: String,
    allowedValues: categoriesList
  },
  purchaseNote: {
    type: String,
    label: "Purchase Note",
    max: 200,
    optional: true
  },
  description: {
    type: String,
    label: "description",
    max: 200,
    optional: true
  },
  image: {
    label: "Image",
    type: Object,
    optional: true,
    blackbox: true
  },
  isFeatured: {
    type: Boolean,
    label: "Featured",
    defaultValue: false
  },
  isInstock: {
    type: Boolean,
    label: "In Stock",
    defaultValue: true
  },
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
