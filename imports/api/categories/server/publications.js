import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories.js';

Meteor.publish('categoriesAll', function(id) {
  return Categories.find();
});
