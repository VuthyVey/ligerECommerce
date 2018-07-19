import './allProducts.html';
import { Products } from '/imports/api/products/products.js';

Template.App_allProduct.onCreated(function (){
  Tracker.autorun(function() {
    console.log("Is product.all ready?:", FlowRouter.subsReady("Product All"));
    console.log("Are all subscriptions ready?:", FlowRouter.subsReady());
});
})
Template.App_allProduct.helpers({
  ProductsList () {
    return Products.find({}).fetch()
  }
})

Template.App_allProduct.events({

});
