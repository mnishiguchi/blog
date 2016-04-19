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
    // - the navigation is clicked
    // - the logo is clicked
    // - the window size is resized
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
  function initStickyDiv() {
    var window_top = $( window ).scrollTop();
    var div_top = $( '#sticky-anchor' ).offset().top;
    if (window_top > div_top) {
      $( '#sticky' ).addClass( 'stick' );
      $( '#sticky-anchor' ).height($( '#sticky' ).outerHeight());
      $( "#rotate-icon" ).addClass( "up" );
    } else {
      $( '#sticky' ).removeClass( 'stick' );
      $( '#sticky-anchor' ).height( 0 );
      $( "#rotate-icon" ).removeClass( "up" );
    }
  }
  $(document).ready( function() {
    $( window ).scroll( initStickyDiv );
    initStickyDiv();
  });
})();


/**
 * Smooth page scroll on click.
 * - Dependency: jQuery and jQuery easing
 */
( function() {
  var anchorHeight = 40; // Adjust this according to the anchor div's height.

  function distanceFromDisplayTop( $element ) {
    return $element.offset().top - $( window ).scrollTop();
  }
  function scrollDownTo( $anchor ) {
    $( "#rotate-icon" ).addClass( "up" );

    $( 'html, body' ).stop().animate({
        scrollTop: ( $( $anchor.attr( 'href' ) ).offset().top - anchorHeight )
    }, 500, 'easeInOutExpo');
    event.preventDefault();
  }
  function scrollUpToTop() {
    $( "#rotate-icon" ).removeClass( "up" );

    $( 'html, body' ).stop().animate({
        scrollTop: 0
    }, 500, 'easeInOutExpo');
    event.preventDefault();
  }

  // Setup a click listener to trigger automatic scroll animation.
  $( '#page-scroll' ).bind( 'click', function( event ) {
    var $anchor  = $( this );
    // console.debug( distanceFromDisplayTop( $anchor ) );
    distanceFromDisplayTop( $anchor ) > 10 ? scrollDownTo( $anchor ) : scrollUpToTop() ;
  });
})();
