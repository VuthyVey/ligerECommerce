// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Carts } from './carts.js';
import { Schemas } from './schema.js';

Carts.attachSchema(Schemas.Carts);

Meteor.methods({
  'productAddToCart' (productObject) {
    var userCart = Carts.find({createdBy: Meteor.userId()}).fetch();
    // console.log(current)
    var cartId = null;

    if (userCart.length == 0) {
      cartId = Carts.insert({productsList: []});
    } else {
      cartId = userCart[0]._id;
    }

    var isProductExistInCart = Carts.find({_id: cartId, productsList: {$elemMatch: {_id: productObject._id}}}).fetch().length != 0;

    if (productObject.isInstock) {
      if (isProductExistInCart) {
        return Carts.update({_id: cartId, 'productsList._id': productObject._id}, { $inc : {"productsList.$.amount" : productObject.amount, "productsList.$.totalCost" : productObject.totalCost} })
      } else {
        return Carts.update(cartId, { $push: { productsList: productObject }});
      }

    } else {
      throw new Meteor.Error(500, productObject.name.english  + " is not available!");
    }

  },
  'addNewCart' () {
    var template = {
      productsList: []
    }
    return Carts.insert(template);
  }
});
