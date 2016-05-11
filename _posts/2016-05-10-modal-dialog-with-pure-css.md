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

I wanted to make the site navigation appear on a modal dialog box. After googling around, I found that I could implement modal with pure CSS. I thought this was a great opportunity to learn how to implement modal without JS.

<!--more-->

![]({{ site.baseurl }}/images/20160510_modal_nav_menu.png)

## Objectives
- Create a simple modal dialog box that displays the navigation menu.
- Open and close the modal by clicking a button.
- Implement it with pure CSS (an anchor link and the CSS pseudo selector `:target`).

## Analysis

#### Advantages
- It works without JavaScript.
- The code for the functionality is located in a single place.

#### Disadvantages
- When I re-visit a URL to open the modal by pressing the back button, the modal dialog is triggered to open.
- It is difficult to prevent the page from scrolling without JavaScript. Even if the modal is open, we can still scroll the page from above the overlay, which is a little strange in the material design standpoint.

## Things that were challenging to me
It was very challenging to me to figure out how to prevent the page from scrolling when the modal is open. I came up with these solutions:

- Not using transparent color for the overlay background.
- Covering most of or entirety of the real estate with the dialog box.
- Giving up on pure CSS implementation and disabling the scrolling using JS.

I realized that simply not using transparent color solves the problem of the page scrolling because if it is invisible, we do not care even if it is actually scrolling!

![]({{ site.baseurl }}/images/20160510_modal_nav_menu_1.png)

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
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 9999; // Sit on top of contents
  width: 100vw; // Full width
  height: 100vh; // Full height
  background: $black;
  &:target { // This is triggered by an anchor hash link to this element.
    opacity: 1;
    pointer-events: auto;  // Enable mouse/touch events.
  }
}
@mixin modal-dialog {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 10000;
  display: block;
  width: 80%;
  height: 80%;
  padding: 0;
  margin: auto;
  background: $black;
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
body.modal-is-open {
  position: fixed;
  overflow: hidden;
}
```
{% endraw %}

#### JavaScript (optional)
We could optionally prevent the page from scrolling without JavaScript as it is difficult to do so with CSS; however now that we use JavaScript giving up on pure CSS implementation, maybe we might as well trigger the modal opening/closing by toggling the `modal-is-open` class unless I really want to support no-js users.

{% raw %}
```js
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
     * Toggle the ".modal-is-open" class on document.body checking whether the nav
     * is targeted of not.
     */
    function toggleModal() {
      if ( document.querySelector( "nav:target" ) ) {
        document.body.classList.add( "modal-is-open" );
      } else {
        document.body.classList.remove( "modal-is-open" );
      }
    }
  });
})();
```
{% endraw %}

## Reference
- [Modal in pure html and css - JSFiddle](http://jsfiddle.net/raving/1mhsynmw/)
