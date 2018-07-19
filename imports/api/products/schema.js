// look at https://atmospherejs.com/aldeed/collection2
import { Products } from './products.js';
import SimpleSchema from 'simpl-schema';

const Schemas = {};
Schemas.Products = new SimpleSchema({
    englishName: String,
    khmerName : String,
    regularPrice : {
        type: Number,
        label: "Regular Price",
        min: 0,
        optional : true
    },
    salePrice : {
        type: Number,
        label: "Sale Price",
        min: 0.01
    },
    unit : {
        type: String,
        label: "Unit",
        allowedValues : function () {return ['kg','gram']}
    },
    min : {
        type: Number,
        label: "Mininum",
        min: 0.01,
        max: 200,
        defaultValue: 0.01
    },
    max : {
        type: Number,
        label: "Maxinum",
        min: 100,
        max: 200,
        defaultValue: 200,
        optional: true
    },
    step : {
        type: Number,
        label: "Step",
        min: 0.01,
        regEx: "\d+(\.\d{1,2})?"
    },
    category : {
        type: String,
        label: "Category"
    },
    purchaseNote : {
        type: String,
        label: "Purchase Note",
        max: 200,
        optional: true
    },
    description : {
        type: String,
        label: "description",
        max: 200,
        optional: true
    },
    imageUrl : {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: "Image Url",
        optional: true
    },
    isFeatured : {
        type: Boolean,
        label: "Featured",
        defaultValue: false
    },
    isInstock : {
        type: Boolean,
        label: "In Stock",
        defaultValue: true
    },
    createdAt : {
        type: Number,
        label: "Create At",
        autoValue: function() {
            if (this.isInsert) {
              return moment().unix();
            } else if (this.isUpsert) {
              return {$setOnInsert: moment().unix()};
            } else {
              this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    createdBy : {
        type: String,
        label: "Create By",
        autoValue: function () {
          return this.userId;
        }
    }
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
});

Products.attachSchema(Schemas.Products);
