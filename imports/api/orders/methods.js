import  { Orders } from  './orders.js';
import  { Carts } from  '/imports/api/carts/carts.js';
import { Schemas } from './schema.js';

Orders.attachSchema(Schemas.Orders);

Meteor.methods({
  'insertToOrder' (cartObj) {
    Carts.remove(cartObj._id);
    return Orders.insert(cartObj);
  }
});
