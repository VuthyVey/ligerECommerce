import './cartPopup.html'
import { Carts } from '/imports/api/carts/carts.js'

Template.cartPopup.helpers({
  cart: () =>{
    var cart = Carts.findOne({createdBy: Meteor.userId()});

    if (cart != undefined) {
        cart.totalCost = cart.totalCost.toFixed(2);
        cart.productsList.map(function (product) {
          product.amount = product.amount.toFixed(2);
          product.totalCost = product.totalCost.toFixed(2);
          return product
        });
      return cart
    } else {
      return {}
    }
  },
  cartLength: () =>{
    var cart = Carts.findOne({createdBy: Meteor.userId()});
    if (cart != undefined) {
      return cart.productsList.length
    } else {
      return 0
    }
  }
});
Template.cartPopup.onRendered(function() {
  Tracker.autorun(() => {
    if (this.subscriptionsReady()) {
      if (Session.get("isCartPopupOpen") == true) {
        console.log("open")
        this.$('.header-dropdown').toggleClass('show-header-dropdown');
      } else {
        console.log("close")
        this.$('.header-dropdown').removeClass('show-header-dropdown');
      }
    }
  });
})
Template.cartPopup.events({
  'click #toggleCartIcon' () {
    Session.set("isCartPopupOpen", !Session.get("isCartPopupOpen"));

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
  'click #checkoutBtn' () {
    cartObj = this;
        swal({
      title: "Are you sure?",
      text: "Once checkout, you will not be able to edit this orders.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Meteor.call('insertToOrder', cartObj, (err, res) => {
          if (err) {
            swal("Something is wrong: " + err, {
              icon: "error",
            });
            throw Meteor.Error("Something is wrong: " + err);
          } else {
            swal("Thank you for your ordering", {
              icon: "success",
            });
          }
        })
      } else {
        swal("You are safe!");
      }
    });
      }
});
