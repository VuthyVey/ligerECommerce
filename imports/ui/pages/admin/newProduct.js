// import templates
import './newProduct.html';
import '/imports/ui/components/selectImage/selectImage.js';
// import collections
import { Products } from '/imports/api/products/products.js';
import { Categories } from '/imports/api/categories/categories.js';
import { Images } from '/imports/api/images/images.js';
// import functionalities
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore'; //underscore isn't in global scope so we import it
import { fetchSubCategory } from '/imports/ui/pages/javascript/subcategory.js';

import swal from 'sweetalert'

Template.App_newProduct.onRendered(function() {
  Session.set("productImageId", ""); // empty

  if (Session.get('productStatus') == "edit") { // special care to inputs when it's edit mode
    var productInfo = Products.findOne(); // subscribe already given id params to publication
    var target = $('#newProductForm');

    // filling info from database to inputs
    if (productInfo) {
      $('#englishName').val(productInfo.name.english);
      $('#khmerName').val(productInfo.name.khmer);
      $('#regularPrice').val(productInfo.regularPrice);
      $('#salePrice').val(productInfo.salePrice);
      $('#unit').val(productInfo.unit);
      $('#min').val(productInfo.min);
      $('#step').val(productInfo.step);

      // checkbox has it special id that match with categories slug
      _.each(productInfo.categories, function(doc) {
        $('#' + doc).prop("checked", true);
      });

      $('#purchaseNote').val(productInfo.purchaseNote);
      $('#description').val(productInfo.description);
      $('#featured').prop("checked", productInfo.isFeatured);
      $('#instock').prop("checked", productInfo.isInstock);

      // session handle image | check helpers
      Session.set('productImageId', productInfo.image._id);
    } else { // if product ID doesn't exist
      FlowRouter.go('/admin/products/new');
    }
  }
});

Template.App_newProduct.helpers({
  isEditMode() {
    return (Session.get('productStatus') == "edit") ? true : false;
  },

  categoriesList() {
    var list = Categories.find({tree: {$size: 0}}).fetch(); // fetch empty tree, in otherword categories no parent

    list = list.map(function(obj) {
      obj.subcategory = fetchSubCategory(obj.slug); // from import './javascript/subcategory.js';
      return obj;
    });
    return list;
  }
});

Template.App_newProduct.events({
  'submit #newProductForm' (events, template) {
    events.preventDefault();
    // get the selected image object
    const imgObj = Images.findOne({_id: Session.get("productImageId")});
    // fetch checked categories into the array
    var selectedCategories = []
    $("input:checkbox[name=categories]:checked").each(function() {
      selectedCategories.push($(this).val());
    });
    // putting information into schema format
    const target = events.target;
    const productInfo = {
      name: {
        english: target.englishName.value,
        khmer: target.khmerName.value,
      },
      regularPrice: target.regularPrice.value,
      salePrice: target.salePrice.value,
      unit: target.unit.value,
      min: target.min.value,
      step: target.step.value,
      categories: selectedCategories,
      purchaseNote: target.purchaseNote.value,
      description: target.description.value,
      image: imgObj,
      isFeatured: target.featured.checked,
      isInstock: target.instock.checked
    }

    if (Session.get('productStatus') == 'new') {
      // for inserting
      Meteor.call('product.new', productInfo, (error, result) => {
        if (error) {
          swal("Oops...", error.reason, "error");
          console.log(error)
        } else {
          swal("Yay", productInfo.name.english + " added to database", "success");
          FlowRouter.go("/admin/products/edit/" + result)
        }
      })
    } else if (Session.get('productStatus') == 'edit') {
      // for updating
      Meteor.call('product.update', Session.get('productId'), productInfo, (error, result) => {
        if (error) {
          swal("Oops...", error.reason, "error");
          console.log(error)
        } else {
          swal("Yay", productInfo.name.english + " updated to database", "success");
        }
      });
    }
  }
});
