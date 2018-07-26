import './selectImage.html';
import { Images } from '/imports/api/images/images.js';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal'; // normal bootstrap code doesn't work so this package is the alternative

Template.cSelectImage.helpers({
  currentProductImage() {
    return Images.findOne({_id: Session.get("productImageId")});
  }
});

Template.cSelectImage.events({
  'click #selectImageBtn' (events, templates) {
    Modal.show('selectImageModal');
  },
});

Template.selectImageModal.events({
  'click .productImage' (e, tpl) {
    Session.set('productImageId', this._id); // set a new selected image id
    Modal.hide('selectImageModal');
  }
});

Template.selectImageModal.helpers({
  images: function() {
    return Images.find({}, {sort: {uploadedAt: -1}}); // new upload come first
  }
});
