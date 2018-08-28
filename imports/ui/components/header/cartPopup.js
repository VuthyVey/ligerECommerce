import './cartPopup.html'
import { Carts } from '/imports/api/carts/carts.js'

Template.cartPopup.helpers({
  productsList: () =>{
    console.log()
    return Carts.find({createdBy: Meteor.userId()}).fetch()[0].productsList
  },
  cartLength: () =>{
    return Carts.find({createdBy: Meteor.userId()}).fetch()[0].productsList.length
  }
})
