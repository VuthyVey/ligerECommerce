// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Carts } from '../carts.js';

Meteor.publish('cartsAll', function() {
  return Carts.find();
});
