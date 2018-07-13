import './home.html';

import '../../components/hello/hello.js';
import '../../components/info/info.js';


Template.App_home.events({
  'click .block2-btn-addcart'(e) {
    var nameProduct = "Vuthy"; // TODO: Get name of product
    swal(nameProduct, "is added to cart !", "success"); // Swal is sweet alert function
  },
  'click .block2-btn-addwishlist'(e) {
    var nameProduct = "Vuthy"; // TODO: Get name of product
    swal(nameProduct, "is added to wishlist !", "success");
  }
})
