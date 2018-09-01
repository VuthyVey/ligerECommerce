import './cart.html'

import { Carts } from '/imports/api/carts/carts.js';

Template.App_cart.helpers({
  cart: () =>{
    var cart = Carts.findOne({createdBy: Meteor.userId()});

    if (cart != undefined) {
        cart.totalCost = cart.totalCost.toFixed(2);
        cart.productsList.map(function (product) {
          product.amount = product.amount.toFixed(2);
          product.totalCost = product.totalCost.toFixed(2);
          return product;
        });
      return cart;
    } else {
      return {}
    }
  }
});

Template.App_cart.events({
  'click #increaseBtn' () {
    var cart = Carts.findOne({createdBy: Meteor.userId()})

    Meteor.call("changeAmountToProduct", cart._id, this._id, this.min, this.salePrice,(error, result) => {
      if (error) {
        swal("Oops...", error.reason, "error");
        console.log(error)
      }
    })
  },
  'click #decreaseBtn' () {
    var cart = Carts.findOne({createdBy: Meteor.userId()})

    Meteor.call("changeAmountToProduct", cart._id, this._id, -this.min, this.salePrice,(error, result) => {
      if (error) {
        swal("Oops...", error.reason, "error");
        console.log(error);
      }
    })
  },
  'click .removeProduct' (event, template){
    console.log(this._id)
    var cart = Carts.findOne({createdBy: Meteor.userId()});

    Meteor.call("removeProductFromCart", cart._id, this._id, (error, result) => {
      if (error) {
        swal("Oops...", error.reason, "error");
        console.log(error)
      }
    })
  },
  'change .num-product' (e, tmp) {
    console.log("Hello World");
    var cart = Carts.findOne({createdBy: Meteor.userId()});
    var amount = parseFloat(e.target.value);

    if (amount <= 0) {
      amount = this.min;
      $(e.target).val(this.min);
    }

    amount = amount - (amount % this.step);
    $(e.target).val(amount);

    Meteor.call("setAmountProductInCart", cart._id, this._id, amount , this.salePrice);
  }
})
