import './lAdmin.html';

Template.lAdmin.onCreated(function () {
  Meteor.subscribe('links.all');

});
