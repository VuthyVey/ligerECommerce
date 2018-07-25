import SimpleSchema from 'simpl-schema';

const Schemas = {};
Schemas.Categories = new SimpleSchema({
  name: {
    type: String,
    max: 12,
    unique: true
  },
  slug: {
    type: String,
    unique: true
  },
  parent: {
    type: String,
    optional: true
  },
  tree: {
    type: Array,
    optional: true
  },
  'tree.$': {
    type: String
  },
  createdAt: {
    type: Number,
    label: "Create At",
    autoValue: function() {
      if (this.isInsert) {
        return moment().unix();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: moment().unix()
        };
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
        return moment().unix()
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

export { Schemas }
