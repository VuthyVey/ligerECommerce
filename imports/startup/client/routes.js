import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
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
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_body', { main: 'App_login' });
  },
});

FlowRouter.route('/admin', {
  name: 'App.admin',
  action() {
    BlazeLayout.render('App_body_admin', { main: 'admin' });
  },
});

FlowRouter.route('/admin/new_product', {
  name: 'App.newProduct',
  action() {
    BlazeLayout.render('App_body_admin', { main: 'App_newProduct' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
