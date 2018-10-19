import './lAdmin.html'

Template.lAdmin.helpers({
  'subscriptionsReady' () {
    return FlowRouter.subsReady(); // return weather registered subscriptions done with its job
  },
  'isAdmin' () {
    return Roles.userIsInRole(Meteor.user(), ['admin']) // check if the user is admin // alanning:roles
  }
})
