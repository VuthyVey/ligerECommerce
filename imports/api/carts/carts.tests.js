// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Carts }
if (Meteor.isServer) {
  describe('products collection', function () {
    it('insert correctly', function () {
      const linkId = Carts.insert({
        title: 'meteor homepage',
        url: 'https://www.meteor.com',
      });
      const added = Carts.find({ _id: linkId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'carts');
      assert.equal(count, 1);
    });
  });
}
