// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Products } from './products.js';
import './schema.js';

Meteor.methods({
  'product.new'(productObject) {
    // productObject.createdAt = new Date();
    // productObject.createdBy = Meteor.userId();
    //
    // check(productObject.imageUrl, String);
    // console.log('my name is Vurhy')
    return Products.insert(productObject);
  },
});
