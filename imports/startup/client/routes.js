import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed layout template
import '../../ui/layouts/shop/lShop.js';
import '../../ui/layouts/admin/lAdmin.js';
// Import needed pages template
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/admin/newProduct.js';
import '../../ui/pages/accounts/login.js';
import '../../ui/pages/learning/learning.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('lShop', { main: 'App_home' });
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('lShop', { main: 'App_login' });
  },
});

var isUserCheck = function (context, redirect, stop) {
  if (!Meteor.userId()) {
    Session.set('redirectPath', context.path);
    redirect('/login');
  }
}

var isAdminCheck = function (context, redirect, stop) {
  var loggedInUser = Meteor.user();

  var x = Roles.userIsInRole(Meteor.user()._id, ['normal-user', 'admin']);
  console.log(x)
  if (!Roles.userIsInRole(loggedInUser, ['normal-user'])){ // not admin can't access to the page
    console.log("Go")
    BlazeLayout.render('lShop', { main: 'App_notFound' });
    stop(); // stop moving to next routers functions
  }
}


var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [isUserCheck, isAdminCheck ]
});

// handling /admin route
adminRoutes.route('/', {
  action: function() {
      BlazeLayout.render('lAdmin', { main: 'admin' });
  }
});

adminRoutes.route('/new_product', {
  name: 'App.newProduct',
  action() {
    BlazeLayout.render('lAdmin', { main: 'App_newProduct' });
  },
});



FlowRouter.notFound = {
  action() {
    BlazeLayout.render('lShop', { main: 'App_notFound' });
  },
};
