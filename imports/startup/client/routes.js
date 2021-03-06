import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed layout template
import '../../ui/layouts/shop/lShop.js';
import '../../ui/layouts/admin/lAdmin.js';
import '../../ui/layouts/user/lUser.js';
// Import needed pages template
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/admin/newProduct.js';
import '../../ui/pages/admin/allProducts.js';
import '../../ui/pages/admin/categories.js';
import '../../ui/pages/accounts/login.js';
import '../../ui/pages/shop/shop.js';
import '../../ui/pages/cart/cart.js';
import '../../ui/pages/user/orders.js';
import '../../ui/pages/user/order_view.js';


import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('lShop', {
      main: 'App_home'
    });
  },
});
// main: 'App_home'
// App_home is the template name and main is indicate in layout template

FlowRouter.route('/login', {
  name: 'App.login', // name of the route, it should be unique among all routers
  action() {
    BlazeLayout.render('lShop', {
      main: 'App_login'
    });
  },
});

FlowRouter.route('/shop', {
  name: 'App.shop', // name of the route, it should be unique among all routers
  subscriptions: function () {
    this.register('Product All', Meteor.subscribe('productAll')); //
    this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
    this.register('cartsAll', Meteor.subscribe('cartsAll'))
  },
  action() {
    BlazeLayout.render('lShop', {
      main: 'App_shop'
    });
  },
});

FlowRouter.route('/cart', {
  name: 'App.cart', // name of the route, it should be unique among all routers
  subscriptions: function () {
    this.register('Product All', Meteor.subscribe('productAll')); //
    this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
    this.register('cartsAll', Meteor.subscribe('cartsAll'))
  },
  action() {
    BlazeLayout.render('lShop', {
      main: 'App_cart'
    });
  },
});

FlowRouter.route('/orders', {
  name: 'App.orders', // name of the route, it should be unique among all routers
  subscriptions: function () {
    // this.register('Product All', Meteor.subscribe('productAll')); //
    // this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
    this.register('ordersAll', Meteor.subscribe('ordersAll'))
  },
  action() {
    BlazeLayout.render('lShop', {
      main: 'App_User_order'
    });
  },
});

FlowRouter.route('/orders/view/:orderId', {
  name: 'App.ordersView', // name of the route, it should be unique among all routers
  subscriptions: function (params, queryParams) {
    // this.register('Product All', Meteor.subscribe('productAll')); //
    // this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis

    this.register('ordersById', Meteor.subscribe('ordersById', params.orderId))
  },
  action(params, queryParams) {
    Session.set("OrderId", params.orderId);
    BlazeLayout.render('lShop', {
      main: 'App_orderView'
    });
  },
});

var isUserLoggedIn = function(context, redirect, stop) {
  if (!Meteor.userId()) { // check if the user is not logged in
    Session.set('redirectPath', context.path); // session for login page to redirect back
    redirect('/login');
  }
}

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [isUserLoggedIn] // every time user use admin page, we need to make sure they logged in
});

// handling /admin route
adminRoutes.route('/', {
  action: function() {
    BlazeLayout.render('lAdmin', {
      main: 'admin'
    });
  }
});

// page with list of all products
adminRoutes.route('/products', {
  name: 'App.allProducts',
  subscriptions: function() {
    this.register('Product All', Meteor.subscribe('productAll')); //
  },
  action() {
    BlazeLayout.render('lAdmin', {
      main: 'App_allProduct'
    });
  },
});

adminRoutes.route('/products/new', {
  name: 'App.newProduct',
  subscriptions: function() {
    this.register("images", Meteor.subscribe("images")); // this is local subscribe, only for this router
    this.register('categoriesAll', Meteor.subscribe('categoriesAll')); // all categoreis
  },
  action() {
    Session.set("productStatus", "new"); // since route: "/products/new" and "/products/edit" use the same template we use session to tell what mode the user is
    BlazeLayout.render('lAdmin', {
      main: 'App_newProduct'
    });
  },
});

adminRoutes.route('/products/edit/:id', {
  name: 'App.newProduct',
  subscriptions: function(params, queryParams) {
    this.register('productById', Meteor.subscribe('productById', params.id)); // subscribe only to the product with id given
    this.register("images", Meteor.subscribe("images")); // all images
    this.register('Categories All', Meteor.subscribe('categoriesAll')); // all the categories
  },
  action(params) {
    Session.set("productStatus", "edit"); // new and edit products use the same template
    Session.set("productId", params.id); // for update to database
    BlazeLayout.render('lAdmin', {
      main: 'App_newProduct'
    });
  },
});

// new and delete categoreis page
adminRoutes.route('/categories', {
  name: 'App.categories',
  subscriptions: function(params, queryParams) {
    this.register('Categories All', Meteor.subscribe('categoriesAll')); // categories should be subscribe for categories page
    this.register("images", Meteor.subscribe("images")); // all images
  },
  action() {
    BlazeLayout.render('lAdmin', {
      main: 'App_categories'
    });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('lShop', {
      main: 'App_notFound'
    });
  },
};
// subscribe as global with FlowRouter register
FlowRouter.subscriptions = function() {
  this.register('roles', Meteor.subscribe('roles'));
};
