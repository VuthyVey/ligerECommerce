import { FlowRouter } from 'meteor/kadira:flow-router';

// Import needed layout template
import '../../ui/layouts/shop/lShop.js';
import '../../ui/layouts/admin/lAdmin.js';
// Import needed pages template
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/admin/newProduct.js';
import '../../ui/pages/admin/allProducts.js';
import '../../ui/pages/admin/categories.js';
import '../../ui/pages/accounts/login.js';
import '../../ui/pages/shop/shop.js';

import '../../ui/pages/not-found/not-found.js';

import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom';
import { mount } from 'react-mounter';
import Blaze from 'meteor/gadicc:blaze-react-component';

import Comments from '/imports/ui/components/testing.js';
import App_newProduct from '/imports/ui/components/testing.js'
import BlogLayout from '/imports/ui/layouts/blog.jsx';
import AdminLayout from '/imports/ui/layouts/admin.jsx';

import ProductModiferForm from '/imports/ui/components/admin/ProductModiferForm.jsx';

const NewProduct = () => (<div>
  <Blaze template="App_newProduct" />
</div>);

const Home = () => (<div>
  <Blaze template="App_home" />
</div>);


FlowRouter.route('/', {
    action: function(params, queryParams) {
      console.log("Yeah! We are on the post:", params.postId);
      mount(BlogLayout, {
        content: <Home />
      });
    }
});

FlowRouter.route('/admin/product/new', {
    // subscriptions: function() {
    //   this.register("images", Meteor.subscribe("images")); // this is local subscribe, only for this router
    //   this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
    // },
    action: function(params, queryParams) {
      console.log("Yeah! We are on the post:", params.postId);
      mount(AdminLayout, {
        content: <ProductModiferForm />
      });
    }
});
// main: 'App_home'
// App_home is the template name and main is indicate in layout template
//
// FlowRouter.route('/login', {
//   name: 'App.login', // name of the route, it should be unique among all routers
//   action() {
//     BlazeLayout.render('lShop', {
//       main: 'App_login'
//     });
//   },
// });
//
// FlowRouter.route('/shop', {
//   name: 'App.shop', // name of the route, it should be unique among all routers
//   subscriptions: function () {
//     this.register('Product All', Meteor.subscribe('productAll')); //
//     this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
//   },
//   action() {
//     BlazeLayout.render('lShop', {
//       main: 'App_shop'
//     });
//   },
// });
//
// var isUserLoggedIn = function(context, redirect, stop) {
//   if (!Meteor.userId()) { // check if the user is not logged in
//     Session.set('redirectPath', context.path); // session for login page to redirect back
//     redirect('/login');
//   }
// }
//
// var adminRoutes = FlowRouter.group({
//   prefix: '/admin',
//   name: 'admin',
//   triggersEnter: [isUserLoggedIn] // every time user use admin page, we need to make sure they logged in
// });
//
// // handling /admin route
// adminRoutes.route('/', {
//   action: function() {
//     BlazeLayout.render('lAdmin', {
//       main: 'admin'
//     });
//   }
// });
//
// // page with list of all products
// adminRoutes.route('/products', {
//   name: 'App.allProducts',
//   subscriptions: function() {
//     this.register('Product All', Meteor.subscribe('productAll')); //
//   },
//   action() {
//     BlazeLayout.render('lAdmin', {
//       main: 'App_allProduct'
//     });
//   },
// });
//
// adminRoutes.route('/products/new', {
//   name: 'App.newProduct',
//   subscriptions: function() {
//     this.register("images", Meteor.subscribe("images")); // this is local subscribe, only for this router
//     this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
//   },
//   action() {
//     Session.set("productStatus", "new"); // since route: "/products/new" and "/products/edit" use the same template we use session to tell what mode the user is
//     BlazeLayout.render('lAdmin', {
//       main: 'App_newProduct'
//     });
//   },
// });
//
// adminRoutes.route('/products/edit/:id', {
//   name: 'App.newProduct',
//   subscriptions: function(params, queryParams) {
//     this.register('productById', Meteor.subscribe('productById', params.id)); // subscribe only to the product with id given
//     this.register("images", Meteor.subscribe("images")); // all images
//     this.register('Categories All', Meteor.subscribe('categoriesAll')); // all the categories
//   },
//   action(params) {
//     Session.set("productStatus", "edit"); // new and edit products use the same template
//     Session.set("productId", params.id); // for update to database
//     BlazeLayout.render('lAdmin', {
//       main: 'App_newProduct'
//     });
//   },
// });
//
// // new and delete categoreis page
// adminRoutes.route('/categories', {
//   name: 'App.categories',
//   subscriptions: function(params, queryParams) {
//     this.register('Categories All', Meteor.subscribe('categoriesAll')); // categories should be subscribe for categories page
//     this.register("images", Meteor.subscribe("images")); // all images
//   },
//   action() {
//     BlazeLayout.render('lAdmin', {
//       main: 'App_categories'
//     });
//   },
// });
//
// FlowRouter.notFound = {
//   action() {
//     BlazeLayout.render('lShop', {
//       main: 'App_notFound'
//     });
//   },
// };
// // subscribe as global with FlowRouter register
// FlowRouter.subscriptions = function() {
//   this.register('roles', Meteor.subscribe('roles'));
// };
