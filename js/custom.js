"use strict";

/**
 * http://stackoverflow.com/a/11381730/989439
 * @return true if the device is a mobile device, else false.
 */
function mobilecheck() {
  var check = false;
  (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}


/**
 * Initialize sidebar toggle.
 */
document.addEventListener("DOMContentLoaded", function() {
  var toggle   = document.querySelector('.sidebar-toggle');
  var sidebar  = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  // Close the sidebar when the screen other than the sidebar itself is clicked.
  document.addEventListener('click', function(e) {
    var target = e.target;
    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;
    checkbox.checked = false;
  }, false);

  // Close the sidebar on resize if it is open.
  window.addEventListener('resize', function(e) {
    // console.log("resized");
    if(!checkbox.checked) return;
    checkbox.checked = false;
  }, false);
});


/**
 * Sticky element.
 * http://blog.yjl.im/2010/01/stick-div-at-top-after-scrolling.html
 */
(function() {

  var sticky, stickySpacer, rotatingIcon, stickyLink;
  var originalDistance, currentOffset, currentDistance;

  function getDistanceFromTop( elem ) {
    if ( elem != undefined ) return elem.offsetTop;
  }

  function isStuck() {
    return currentOffset >= originalDistance;
  }

  function initStickyDiv() {
    sticky       = document.getElementById("sticky");
    stickySpacer = document.getElementById("sticky-spacer");
    rotatingIcon = document.getElementById("rotating-icon");
    stickyLink   = document.querySelector("#sticky a[data-scroll]");

    originalDistance = getDistanceFromTop( stickySpacer );
    currentOffset    = window.pageYOffset;
    currentDistance  = originalDistance - currentOffset;

    // console.info("originalDistance", originalDistance);
    // console.info("currentOffset", currentOffset);
    // console.info("currentDistance", currentDistance);

    if ( isStuck() ) {
      classie.add( sticky, 'stick' );
      stickySpacer.style.height = sticky.offsetHeight + "px";
      classie.add( rotatingIcon, 'up' );
      stickyLink.href = "#";
    } else {
      classie.remove( sticky, 'stick' );
      stickySpacer.style.height = 0 + "px";
      classie.remove( rotatingIcon, 'up' );
      stickyLink.href = "#scroll-to";
    }
    // NOTE: element.style.height requires us to specify a string of "px" value
    // (E.g., `element.style.height = height + "px";`).
  }

  document.addEventListener( "DOMContentLoaded", function() {
    window.addEventListener( 'scroll', initStickyDiv );
    initStickyDiv();

    // https://github.com/cferdinandi/smooth-scroll
    smoothScroll.init({
        speed: 200, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeOutCubic' // Easing pattern to use
    });
  });
})();
