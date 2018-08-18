import './selectImage.html';
import { Images } from '/imports/api/images/images.js';
// import { Modal } from 'meteor/peppelg:bootstrap-3-modal'; // normal bootstrap code doesn't work so this package is the alternative

Template.cSelectImage.helpers({
  currentProductImage() {
    return Images.findOne({_id: Session.get("productImageId")});
  }
});

Template.cSelectImage.events({
  'click #selectImageBtn' (events, templates) {
    // Modal.show('selectImageModal');
  },
  'change #upload' (event, template) {
    var file = $('#upload').get(0).files[0]; // get object from file input

    if (file) {
      var fsFile = new FS.File(file); // convert to FS.File
      fsFile.updatedAt(moment().unix()); // change updatedAt format to timestamp
      fsFile.owner = Meteor.userId(); // default doesn't include, add owner to the image object
      Images.insert(fsFile, function(err, res) { //insert image // proper way is to call meteor method
        if (err) {
          throw new Meteor.Error(err);
        } else {
          Session.set('productImageId', res._id);
        }
      });
    }
  }
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
