"use strict";

// Navigation toggle
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

// ( function() {
//   document.addEventListener( "DOMContentLoaded", function() {
//     // Get HTML elements.
//     var masthead    = document.getElementById( "masthead" );
//     var logo        = document.getElementById( "logo" );
//     var tagline     = document.getElementById( "logo--tagline" );
//
//     // Remember the original texts.
//     var logoText    = logo.innerHTML;
//     var taglineText = tagline.innerHTML;
//
//     // Add event handlers to the masthead.
//     masthead.addEventListener( 'mouseenter', setHoverText, false );
//     masthead.addEventListener( 'mouseleave', setOriginalText, false );
//
//     function setHoverText() {
//       logo.innerHTML    = "にしぐちまさとし";
//       tagline.innerHTML = "ウェブデベロッパー";
//     }
//     function setOriginalText() {
//       logo.innerHTML    = logoText;
//       tagline.innerHTML = taglineText;
//     }
//   });
// })();
