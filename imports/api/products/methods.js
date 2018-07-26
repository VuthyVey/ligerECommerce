// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Products } from './products.js';
import { Schemas } from './schema.js';

Products.attachSchema(Schemas.Products);

Meteor.methods({
  'product.new' (productObject) {
    // productObject.createdAt = new Date();
    // productObject.createdBy = Meteor.userId();
    //
    // check(productObject.imageUrl, String);
    // console.log('my name is Vurhy')
    return Products.insert(productObject);
  },
  'product.update' (id, productObject) {

    return Products.update({
      _id: id
    }, {
      $set: productObject
    });
  },
  'product.remove' (id) {
    return Products.remove(id);
  }
});
