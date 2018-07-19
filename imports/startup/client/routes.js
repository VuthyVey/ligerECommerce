import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed layout template
import '../../ui/layouts/shop/lShop.js';
import '../../ui/layouts/admin/lAdmin.js';
// Import needed pages template
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/admin/newProduct.js';
import '../../ui/pages/admin/allProducts.js';
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

var isUserLoggedIn = function (context, redirect, stop) {
  if (!Meteor.userId()) { // check if the user is not logged in
    Session.set('redirectPath', context.path); // session for login page to redirect back
    redirect('/login');
  }
}

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [ isUserLoggedIn ]
});

// handling /admin route
adminRoutes.route('/', {
  action: function() {
      BlazeLayout.render('lAdmin', { main: 'admin' });
  }
});

adminRoutes.route('/products/new', {
  name: 'App.newProduct',
  action() {
    Session.set("productStatus", "new")
    BlazeLayout.render('lAdmin', { main: 'App_newProduct' });
  },
});

adminRoutes.route('/products', {
  name: 'App.allProducts',
  subscriptions: function (params, queryParams) {
    this.register('Product All', Meteor.subscribe('productAll'));
  },
  action() {
    BlazeLayout.render('lAdmin', { main: 'App_allProduct' });
  },
});


adminRoutes.route('/products/edit/:id', {
  name: 'App.newProduct',
  subscriptions: function (params, queryParams) {
    this.register('productById', Meteor.subscribe('productById',params.id));
  },
  action(params) {
    Session.set("productStatus", "edit");
    Session.set("productId",params.id)
    BlazeLayout.render('lAdmin', { main: 'App_newProduct' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('lShop', { main: 'App_notFound' });
  },
};
// subscribe as global with FlowRouter register
FlowRouter.subscriptions = function() {
  this.register('roles', Meteor.subscribe('roles'));
};
