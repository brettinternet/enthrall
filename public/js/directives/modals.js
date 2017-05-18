angular.module('enthrall').directive('modal', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attribute) {
      $(document).ready(function() {
        // login display
        $('.login-container-button').on('click touchstart', function() {
          $('#modal').css({'display': 'block'});
        })
        $('#exit-icon').on('click touchstart', function() {
          $('#modal').css({'display': 'none'});
        })
        $(window).on('click touchstart', function(event) {
          if ($(event.target).is('#modal')) {
            $('#modal').css({'display': 'none'});
          }
        })
        // link display
        $('#info-icon').on('click touchstart', function() {
          $('#link-modal').css({'display': 'block'});
        })
        $('#exit-icon2').on('click touchstart', function() {
          $('#link-modal').css({'display': 'none'});
        })
        $(window).on('click touchstart', function(event) {
          if ($(event.target).is('#link-modal')) {
            $('#link-modal').css({'display': 'none'});
          }
        })
        // signup display
        $('.signup-button-onnav').on('click touchstart', function() {
          $('#nav-background').toggle();
          $('nav').animate({width: 'toggle'});
          $('.logo').toggleClass('logo-color');
          $('#modal-signup').css({'display': 'block'});
        })
        $('#exit-icon3').on('click touchstart', function() {
          $('#modal-signup').css({'display': 'none'});
        })
        $(window).on('click touchstart', function(event) {
          if ($(event.target).is('#modal-signup')) {
            $('#modal-signup').css({'display': 'none'});
          }
        })

        // create from sign-in modal
        $('.signup-button').on('click touchstart', function() {
          $('#modal').css({'display': 'none'});
          $('#modal-signup').css({'display': 'block'});
        })
        $('#exit-icon3').on('click touchstart', function() {
          $('#modal-signup').css({'display': 'none'});
        })
        $(window).on('click touchstart', function(event) {
          if ($(event.target).is('#modal-signup')) {
            $('#modal-signup').css({'display': 'none'});
          }
        })

        // create display
        // $('#create-onnav').on('click touchstart', function() {
        //   (function() {
        //   $('#nav-background').toggle();
        //   $('nav').toggle();
        //   $('.logo').toggleClass('logo-color');
        //   })
        //   $('#modal-create').css({'display': 'block'});
        // })
        // $('#exit-icon4').on('click touchstart', function() {
        //   $('#modal-create').css({'display': 'none'});
        // })
        // $(window).on('click touchstart', function(event) {
        //   if ($(event.target).is('#modal-create')) {
        //     $('#modal-create').css({'display': 'none'});
        //   }
        // })

        // show html code
        $('#show-html').on('click touchstart', function() {
          $('#modal-showhtml').css({'display': 'block'});
        })
        $('#exit-icon4').on('click touchstart', function() {
          $('#modal-showhtml').css({'display': 'none'});
        })
        $(window).on('click touchstart', function(event) {
          if ($(event.target).is('#modal-showhtml')) {
            $('#modal-showhtml').css({'display': 'none'});
          }
        })
      })
    }
  }
})
