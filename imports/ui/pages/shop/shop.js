// import templates
import './shop.html'
// import collections
import { Products } from '/imports/api/products/products.js';
import { Categories } from '/imports/api/categories/categories.js';
import { Carts } from '/imports/api/carts/carts.js';

// import functionalities
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore'; //underscore isn't in global scope so we import it
import { fetchSubCategory } from '/imports/ui/pages/javascript/subcategory.js';
import { ReactiveVar} from 'meteor/reactive-var';
import swal from 'sweetalert';


Template.App_shop.onCreated(function () {
  Session.setDefault('searchProduct', '');
  Session.setDefault('sortingType', 'default');
  Session.setDefault('priceRange', '');
  Session.setDefault('selectedCategory', 'all');

  this.sortingType = new ReactiveVar( "default" );
  this.searchQueue = new ReactiveVar( "" );
  this.sortingPriceRange = new ReactiveVar( "" );
})

var getSortingFormat = function (sortingType) {
  switch (sortingType) {
    case 'priceHighToLow' :
      return { sort : { salePrice: -1 } }
    case 'priceLowToHigh' :
      return { sort : { salePrice: 1 } }
    case 'newness' :
      return { sort : { createdAt: -1} }
    default:
      return { sort : {'name.english': 1} }

  }
}

var getSearchIndentification = function (searchProduct, selectedCategory, priceRange) {

  var hasSearch = (searchProduct != '') ? true : false;
  var hasCategories = (selectedCategory != '') ? true : false;
  hasCategories = (selectedCategory != 'all') ? true : false;
  var hasPriceRange = (priceRange != null) ? true : false;


  var categoriesQueue;
  var priceRangeQueue;
  var searchQueue;
  console.log(selectedCategory)
  console.log(hasSearch, hasCategories, hasPriceRange)


  if (hasPriceRange) {
    priceRangeQueue = {salePrice: { '$gte' : priceRange.from, '$lte': priceRange.to}};
  } else {
    priceRangeQueue = {salePrice: { '$gte' : 0}};
  }
  console.log(priceRangeQueue)

  categoriesQueue = {categories: selectedCategory};
  searchQueue = {$or: [{'name.english': {$regex: eval("/" + searchProduct + "/i")}}, {'name.khmer': {$regex: eval("/" + searchProduct + "/i")}}]}


  if (hasSearch && hasCategories) {
    return {$and: [
      searchQueue,
      priceRangeQueue,
      categoriesQueue
    ]}
  }

  if (hasSearch) {
    return {$and: [
      searchQueue,
      priceRangeQueue
    ]}
  }

  if (hasCategories) {
    return {$and: [
      priceRangeQueue,
      categoriesQueue
    ]}
  }

  return priceRangeQueue
}

var getPriceRange = function (priceRange) {
  if (!priceRange || priceRange == '') {
    return null;
  }
  priceRangeArray = priceRange.split('/');
  if (priceRangeArray.length != 2) {
    return null;
  }

  return {
    from: parseFloat(priceRangeArray[0]),
    to: parseFloat(priceRangeArray[1])
  }
}

Template.App_shop.helpers({
  productsList() {
    var searchProduct = Template.instance().searchQueue.get();
    var sortingType = Template.instance().sortingType.get();
    var priceRange = getPriceRange(Session.get('priceRange'));
    var selectedCategory = Session.get('selectedCategory');

    console.log(selectedCategory)

    return Products.find(getSearchIndentification(searchProduct, selectedCategory, priceRange), getSortingFormat(sortingType));
  },
  categoriesData() {
    var list = Categories.find({tree: {$size: 0}}, {sort: {name: 1}}).fetch(); // fetch empty tree, in otherword categories no parent

    list = list.map(function(obj) {
      obj.subcategory = fetchSubCategory(obj.slug); // from import './javascript/subcategory.js';
      return obj;
    });
    return list;
  }
});

Template.App_shop.events({
  'click button.add-to-cart' (e, tmp) {
    var nameProduct = this.name.english;
    swal(this.min + this.unit + " of " + nameProduct, "is added to cart !", "success");
    var productObject = this;

    productObject.amount = productObject.min;
    productObject.totalCost = productObject.salePrice * productObject.amount;
    Meteor.call('productAddToCart', productObject, (error, result) => {
      if (error) {
        swal("Oops...", error.reason, "error");
        console.log(error)
      }
    })
  },
  'keyup #searchProductInput' (event, template) {
    var searchQueue = $('#searchProductInput').val().trim();
    Session.set('searchQueue', searchQueue);
    template.searchQueue.set( searchQueue );
  },
  'change #searchProductInput' (event, template) {
    var searchQueue = $('#searchProductInput').val().trim();
    Session.set('searchQueue', searchQueue);
    template.searchQueue.set( searchQueue );
  },
  'change #sortingType' (event, template) {
    var sortingType = $('#sortingType').val();
    Session.set('sortingType', sortingType);
    template.sortingType.set( sortingType );
  },
  'change #priceRange' (event, template) {
    var priceRange = $('#priceRange').val();
    Session.set('priceRange', priceRange);
    template.sortingPriceRange.set( priceRange );
  },
  'click .categoriesLink' (event, template) {
    var selectedCategory = $(event.target).attr('categories')
    event.preventDefault();
    Session.set('selectedCategory', selectedCategory)
  }
})
