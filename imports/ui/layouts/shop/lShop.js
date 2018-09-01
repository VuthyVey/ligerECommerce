import './lShop.html';

// Template.lShop.onCreated(function () {
//   import '/public/js/main.js'
// })

Template.lShop.onRendered(function () {
    Session.setDefault("isCartPopupOpen", false);
})
Template.lShop.events({
  'click body' (e,t) {
    var isCursorInCart = e.target.className.includes(" cart")
    if (!isCursorInCart) {
      Session.set("isCartPopupOpen", false);
    }
  }
})
