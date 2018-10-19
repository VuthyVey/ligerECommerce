import './order_view.html'
import { Orders } from '/imports/api/orders/orders.js';

Template.registerHelper('TimeStampToDate', function (timestamp) {
  return moment.unix(timestamp).format("MM/DD/YYYY hh:mma");
});


Template.App_orderView.helpers({

  cart: () =>{
    return Orders.findOne({_id: Session.get("OrderId"), createdBy: Meteor.userId()});

    // if (order != undefined) {
    //     order.totalCost = order.totalCost.toFixed(2);
    //     order.productsList.map(function (product) {
    //       product.amount = product.amount.toFixed(2);
    //       product.totalCost = product.totalCost.toFixed(2);
    //       return product;
    //     });
    //   return order;
    // } else {
    //   return {}
    // }
  }
});
