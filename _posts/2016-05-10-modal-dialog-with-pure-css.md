---
layout: post
title: Modal dialog with pure CSS
comments: true
tags:
- html
- css
- js
- modal
---

I wanted to make the site navigation appear on a modal dialog box. After googling around, I learned that I could implement modal with pure CSS.

<!--more-->

## Objectives
- Create a simple modal dialog box that displays the navigation menu.
- Open and close the modal by clicking a button.
- Implement it with pure CSS (an anchor link and the CSS pseudo selector `:target`).

## Advantages
- Implementation without JS significantly simplified my navigation code.
- I can maintain the code at a single place.

## Disadvantages
- When I re-visit a URL with the anchor link to open the modal, for example, by pressing the back button, the modal dialog appears.
- Without using JavaScript, it is difficult to prevent the page from scrolling. Even if the modal is open, I can still scroll the page, which is a little strange in the material design standpoint.

## Implementation

#### HTML
The anchor link to `#open-navigation` is used to trigger the modal to open.

{% raw %}
```html
<a href="#open-navigation" title="Open" class="hamburger">
  &#8801
</a>

<nav id="open-navigation">
  <a href="#" title="Close" class="close-modal">
    &#x2715;
  </a>
  <ul id="nav-menu">
    <li class="nav-item active">
      <a>Home</a>
    </li>
    <li class="nav-item">
      <a href="/about">About</a>
    </li>
    <li class="nav-item">
      <a href="/blog/">Blog</a>
    </li>
    <li class="nav-item">
      <a href="/projects">Projects</a>
    </li>
  </ul>
</nav>
```
{% endraw %}

#### SCSS
I trigger the opening/closing of the modal by using an anchor link and the CSS pseudo selector `:target`. When the hamburger that is lined to `#open-navigation` is clicked, the browser targets the element with that ID and gives that element the `:target` pseudo selector. Taking advantage of that, I can switch the modal by the presence of the `:target` pseudo selector on the modal container element.

{% raw %}
```scss
@mixin modal {
  opacity: 0; // Hidden by default
  pointer-events: none; // Disable mouse/touch events by default
  position: fixed;
  z-index: 9999; // Sit on top of contents
  width: 100vw; // Full width
  height: 100vh; // Full height
  background: rgba(0,0,0,0.8);
  &:target { // This is triggered by an anchor hash link to this element.
    opacity: 1;
    * {
      pointer-events: auto;  // Enable mouse/touch events.
    }
  }
}
@mixin modal-dialog {
  position: relative;
  z-index: 10000;
  display: block;
  width: 60%;
  height: auto;
  padding: 0;
  margin: 30% auto;
  background: white;
  pointer-events: none;
}

.hamburger {
  position: absolute;
  top: 16px; right: 10px;
  z-index: 3;
  display: inline-block;
  background: none;
  color: #777;
  border: 1px solid #777;
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
  // Hide it when larger than iPad.
  @media only screen and (min-width : 768px) {
    display: none;
  }
}
.close-modal {
  @extend .hamburger;
  z-index: 10000;
}

// Mobile devices: The Modal (background)
nav {
  @include modal;
  ul {
    @include modal-dialog;
    li {
      display: block;
      height: 56px;
      line-height: 56px;
      color: #777;
      background: white;
      a {
        display: block;
        color: #555;
        background: white;
        padding: 0 .8rem;
        width: 100%;
        height: 56px;
        line-height: 56px;
      }
      &.active a{
        color: #ccc;
        background: #eee;
        text-decoration: none;
        cursor: default;  // Use default cursor instead of the finger pointer.
      }
    }
  }
}

// Prevent BODY from scrolling when a modal is opened
body.modal-open {
  position: fixed;
  overflow: hidden;
}
```
{% endraw %}

#### JavaScript (optional)
This is to prevent the page from scrolling. Even after opening the modal, the page under the modal overlay still can scroll. I could not find a way to disable the page scrolling therefore after all I decided to use JavaScript only for this purpose.

{% raw %}
```js
/**
 * Toggle the ".modal-open" class on body when navigation modal dialog is opened or closed.
 * This can be used to disable page scroll when modal is open.
 */
( function() {
  // Wait until DOM is loaded and then execute.
  document.addEventListener( "DOMContentLoaded", function( event ) {

    // Check the initial state.
    toggleModal();

    // Keep watch on hash change due to back buttoon or history.
    window.addEventListener( "hashchange", toggleModal );

    // Keep watch on page refresh.
    window.addEventListener( "load", toggleModal );

    // Keep watch on screen rotation or resize.
    window.addEventListener( 'resize', toggleModal );

    /**
     * Toggle the ".modal-open" class on document.body checking whether the nav
     * is targeted of not.
     */
    function toggleModal() {
      if ( document.querySelector( "nav:target" ) ) {
        document.body.classList.add( "modal-open" );
      } else {
        document.body.classList.remove( "modal-open" );
      }
    }
  });
})();
```
{% endraw %}

## Reference
- [Modal in pure html and css - JSFiddle](http://jsfiddle.net/raving/1mhsynmw/)
