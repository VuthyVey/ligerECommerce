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

        Carts.update({_id: cartId, 'productsList._id': productObject._id}, { $inc : {"productsList.$.amount" : productObject.amount, "productsList.$.totalCost" : productObject.totalCost} });
        return Meteor.call('updateTotalCost', cartId);
      } else {

        Carts.update(cartId, { $push: { productsList: productObject }});
        return Meteor.call('updateTotalCost', cartId);
      }

    } else {
      throw new Meteor.Error(500, productObject.name.english  + " is not available!");
    }

  },
  'updateTotalCost' (cartId) {
    const cart = Carts.findOne(cartId);
    const productsList = cart.productsList;
    var totalCost = 0;
    console.log(productsList)
    productsList.map(function(product) {
      totalCost += product.totalCost;
    });
    console.log("Total Cost" + totalCost);
    return Carts.update(cartId, {$set: {totalCost: totalCost}})
  },
  'removeProductFromCart' (cartId, productId) {
    Carts.update(cartId, {$pull: {productsList : { _id: productId}}});
    Meteor.call('updateTotalCost', cartId )
  },
  'changeAmountToProduct' (cartId, productId, amount, price) {
    Carts.update({_id: cartId, 'productsList._id': productId}, {$inc: {"productsList.$.amount" : amount, "productsList.$.totalCost" : amount * price}})
    Meteor.call('updateTotalCost', cartId);
  },
  'setAmountProductInCart' (cartId, productId, amount, price) {
    Carts.update({_id: cartId, 'productsList._id': productId}, {$set: {"productsList.$.amount" : amount, "productsList.$.totalCost" : amount * price}})
    Meteor.call('updateTotalCost', cartId);
  }
});
