import  { Categories } from  './categories.js';
import { Products } from '/imports/api/products/products.js'
import { Schemas } from './schema.js';

Categories.attachSchema(Schemas.Categories);

Meteor.methods({
  'categories.new' (categoriesObj) {
    return Categories.insert(categoriesObj);
  },
  'categories.delete' (id, slug, parent) {
    // remove this category from tree array
    Categories.update({tree: slug}, {$pull: {tree: slug}});
    // if any categories that has this category as its parent, change their parent to removed category's parent
    Categories.update({parent: slug}, {$set: {parent: parent}});
    // remove this category from all product category
    Products.update({categories: slug}, {$pull: {categories: slug}});

    return Categories.remove({_id: id});
  }
});
