// import templates
import './categories.html';
// import collection
import { Categories } from '/imports/api/categories/categories.js';
import { Images } from '/imports/api/images/images.js';
// import functionalities
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { fetchSubCategory } from '/imports/ui/pages/javascript/subcategory.js';

Template.App_categories.helpers({
  categoriesList () {
    var list = Categories.find({tree: {$size: 0}}).fetch();

    var list = list.map(function (obj) {
      obj.subcategory = fetchSubCategory(obj.slug); //from import './javascript/subcategory.js';
      return obj;
    })
    return list;
  }
});

Template.App_categories.events({
  'submit #newCategoryForm' (event, template){
    event.preventDefault();

    const target = event.target;
    console.log(target.parent.value);
    console.log(target.name.value);

    const name = target.name.value;
    const slug = target.slug.value;
    const parent = target.parent.value;
    const imgObj = Images.findOne({_id: Session.get("productImageId")});


    var tree = [];
    if (!parent == '') {
      tree = Categories.find({slug: parent}).fetch()[0].tree;
      tree.push(parent);
    }

    const categoriesObj = {
      name: name,
      slug: slug,
      parent: parent,
      tree: tree,
      image: imgObj
    }
    Meteor.call('categories.new', categoriesObj, (err, result) => {
      if (err) {
        swal("Opp...", err.reason, "warning");
      } else {
        console.log('succeed');
        Session.set('productImageId', '')
      }
    });
    target.name.value = '';
    target.slug.value = '';
  },
  'change #name' (event, template) {
    var name = $('#name').val();
    var slug = name.toLowerCase().trim().replace(/ /g, '-');

    $("#slug").val(slug);
  }
});


Template.tableCategories.events({
  'click #deleteButton' () {
    var id = this._id;
    var slug = this.slug;
    var parent = this.parent;
    Meteor.call('categories.delete', id, slug, parent, (err, res) => {
        if (err) {
          throw Meteor.Error(err);
        } else {
          console.log("succeed");
        }
            })
  }
})
