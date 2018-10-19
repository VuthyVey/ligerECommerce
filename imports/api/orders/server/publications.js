import { Meteor } from 'meteor/meteor';
import { Orders } from '../orders.js';

Meteor.publish('ordersAll', function() {
  return Orders.find();
});

Meteor.publish('ordersById', function(id) {
  return Orders.find({
    _id: id
  });
});
