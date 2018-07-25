// import template
import './lAdmin.html';
// import packages
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';

Template.lAdmin.helpers({
  'subscriptionsReady' () {
    return FlowRouter.subsReady(); // return weather registered subscriptions done with its job
  },
  'isAdmin' () {
    return Roles.userIsInRole(Meteor.user(), ['admin']) // check if the user is admin // alanning:roles
  }
})
