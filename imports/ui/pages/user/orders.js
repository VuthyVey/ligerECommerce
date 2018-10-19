import './orders.html';
import { Orders } from '/imports/api/orders/orders.js';

Template.App_User_order.helpers({
  name () {
    return "Vuthy";
  },
  ordersList () {
    return Orders.find({createdBy: Meteor.userId()}, {sort: {updatedAt: -1}});
  }
});
