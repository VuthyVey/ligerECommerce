import { Categories } from '/imports/api/categories/categories.js';

/**
 * @name fetchSubCategory
 * @param parent fetch all categories with this parent
 * @todo fetched all subcategory with parent
 * @description recursion function with Categories
 *
 */
export function fetchSubCategory(parent) {
  // base condition
  if (parent == null || parent == undefined) {
    return;
  } else {

    var list = Categories.find({ parent: parent }).fetch();

    list.map(function(obj) {
      obj.subcategory = fetchSubCategory(obj.slug);
      return obj;
    });
    return list;
  }
}
