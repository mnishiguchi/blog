/**
 * Dependency:
 * - Modernizr, classie, mobilecheck
 */
(function() {

  var support = { animations : Modernizr.cssanimations },
    animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    onEndAnimation = function( el, callback ) {
      var onEndCallbackFn = function( ev ) {
        if( support.animations ) {
          if( ev.target != this ) return;
          this.removeEventListener( animEndEventName, onEndCallbackFn );
        }
        if( callback && typeof callback === 'function' ) { callback.call(); }
      };
      if( support.animations ) {
        el.addEventListener( animEndEventName, onEndCallbackFn );
      }
      else {
        onEndCallbackFn();
      }
    },
    eventtype = mobilecheck() ? 'touchstart' : 'click';

  [].slice.call( document.querySelectorAll( '.cbutton' ) ).forEach( function( el ) {
    el.addEventListener( eventtype, function( ev ) {
      classie.add( el, 'cbutton--click' );
      onEndAnimation( classie.has( el, 'cbutton--complex' ) ? el.querySelector( '.cbutton__helper' ) : el, function() {
        classie.remove( el, 'cbutton--click' );
      } );
    } );
  } );

})();
