import './home.html';

import '../../components/header/header.js';
import '../../components/admin/left-panel.html';

Template.App_home.rendered = function () {
  import './parallax100.js'
  $('.parallax100').parallax100();


}

// Template.App_home.rendered = function()  {
//   // import './slick-custom.js';
//
//   $(".selection-1").select2({
//     minimumResultsForSearch: 20,
//     dropdownParent: $('#dropDownSelect1')
//   });
//   //$.getScript("./slick-custom.js");
//
//   $(document).ready(function() {
//          var script = document.createElement("script");
//          script.type="text/javascript";
//          script.src = "/vendor/countdowntime/countdowntime.js";
//          $("#script_div").append(script);
//
//          var script2 = document.createElement("script");
//          script2.type="text/javascript";
//          script2.src = "/js/slick-custom.js";
//          $("#script_div").append(script2);
//
//
//        });
//
//
// }
// Template.App_home.events({
//   'click .block2-btn-addcart'(e) {
//     var nameProduct = "Vuthy"; // TODO: Get name of product
//     swal(nameProduct, "is added to cart !", "success"); // Swal is sweet alert function
//   },
//   'click .block2-btn-addwishlist'(e) {
//     var nameProduct = "Vuthy"; // TODO: Get name of product
//     swal(nameProduct, "is added to wishlist !", "success");
//   }
// })
