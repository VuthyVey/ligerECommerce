// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';

Meteor.publish('productAll', function() {
  return Products.find();
});

Meteor.publish('productById', function(id) {
  return Products.find({
    _id: id
  });
});
