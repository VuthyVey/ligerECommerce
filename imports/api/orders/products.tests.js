// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Products } from './products.js';

if (Meteor.isServer) {
  describe('products collection', function () {
    it('insert correctly', function () {
      const linkId = Products.insert({
        title: 'meteor homepage',
        url: 'https://www.meteor.com',
      });
      const added = Products.find({ _id: linkId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'products');
      assert.equal(count, 1);
    });
  });
}
