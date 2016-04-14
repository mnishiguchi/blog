"use strict";

/**
 * Navigation toggle.
 */
( function() {
  // Store references to elements so that we can add/remove classes to those elements anytime.
  var hamburger, logo, nav;

  // Wait until DOM is loaded and then execute.
  document.addEventListener( "DOMContentLoaded", function( event ) {

    // Find elements and store eferences to them.
    hamburger = document.getElementById( "hamburger" );
    logo      = document.getElementById( "logo" );
    nav       = document.querySelector( "#masthead" );

    // Apply the slide up animation defined in CSS to the navigation when:
    // - the hamburger is clicked.
    hamburger.addEventListener( 'click', toggleNavbarAnimations );

    // Remove the animation when:
    // - the mouse leaves the naviagation
    // - the navigation is clicked
    // - the logo is clicked
    // - the window size is resized
    nav.addEventListener( 'mouseleave', removeNavbarAnimations );
    nav.addEventListener( 'click', removeNavbarAnimations );
    logo.addEventListener( 'click', removeNavbarAnimations );
    window.addEventListener( 'resize', removeNavbarAnimations );
  });
  function toggleNavbarAnimations() {
    nav.classList.toggle( "slide-down" );
    hamburger.classList.toggle( "active" );
  }
  function removeNavbarAnimations() {
    nav.classList.remove( "slide-down" );
    hamburger.classList.remove( "active" );
  }
})();


/**
 * Sticky element.
 */
( function() {
  // http://blog.yjl.im/2010/01/stick-div-at-top-after-scrolling.html
  function initializeStickyDiv() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
      $('#sticky').addClass('stick');
      $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
      $('#sticky').removeClass('stick');
      $('#sticky-anchor').height(0);
    }
  }
  $(document).ready( function() {
    $( window ).scroll( initializeStickyDiv );
    initializeStickyDiv();
  });
})();
