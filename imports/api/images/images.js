import { Meteor } from 'meteor/meteor';

var createThumb = resizeImageStream({
  width: 200,
  height: 200,
  format: 'image/jpeg',
  quality: 100
});

var imageStore = new FS.Store.GridFS("images");
var thumbnailStore = new FS.Store.GridFS("thumb", {
  transformWrite: createThumb
});

export const Images = new FS.Collection("images", {
  stores: [thumbnailStore, imageStore],
  filter: {
    // maxSize: 1048576,
    allow: {
      contentTypes: ['image/*'], //allow only images in this FS.Collection
      extensions: ['png', 'jpg']
    },
    onInvalid: function(message) {
      if (Meteor.isClient) {
        swal("Opp..", message, 'error');
      } else {
        console.log(message);
      }
    }
  }
});
