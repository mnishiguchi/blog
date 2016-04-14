# Blog

Masatoshi Nishiguchi's blog built on Poole.

-----

## [Poole](https://github.com/poole/poole)
Poole is the butler for [Jekyll](http://jekyllrb.com), the static site generator. It's designed and developed by [@mdo](https://twitter.com/mdo) to provide a clear and concise foundational setup for any Jekyll site. It does so by furnishing a full vanilla Jekyll install with example templates, pages, posts, and styles.

-----

## What I learned

### [page.url](http://jekyllrb.com/docs/variables/#page-variables)
- the URL of the current page, without the host (e.g. /index.html)

### Setting up Disqus
- [Jekyll Installation Instructions](https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions)

### Canonical URLs with Jekyll
```html
<link rel="canonical" href="{{ site.url }}{{ page.url | replace:'index.html',''}}">
```

### Links to Assets
- Make sure that you specify the full url instead of relative path.

```html
<link rel="stylesheet" href="{{ site.baseurl }}/styles.css">
```

### [Subtle Click Feedback Effects](https://github.com/codrops/ClickEffects)
- Adopted from Codrops.

### [Pagination only works within HTML files](http://jekyllrb.com/docs/pagination/)
- Pagination does not work from within Markdown or Textile files from your Jekyll site. Pagination works when called from within the HTML file, named index.html, which optionally may reside in and produce pagination from within a subdirectory, via the paginate_path configuration value.

-----

## Reference

- [Getting Started with Jekyll](https://scotch.io/tutorials/getting-started-with-jekyll-plus-a-free-bootstrap-3-starter-theme) by Scotch
- [Is Jekyll Better Than Joomla! and WordPress?](http://digitalshore.io/jekyll-better-choice-than-joomla-wordpress/)
- [Make a Static Website with Jekyll](https://www.taniarascia.com/make-a-static-website-with-jekyll/) by Tania Rascia
- [How I Created a Beautiful and Minimal Blog Using Jekyll, Github Pages, and poole](http://joshualande.com/jekyll-github-pages-poole/) by Joshua Lande
- [Using a custom domain with GitHub Pages](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)

- [Codrops](http://tympanus.net/codrops/) - Ideas for UI
- [Minimal Blog Using Jekyll, Github Pages, and poole](http://joshualande.com/jekyll-github-pages-poole/) by Joshua Lande
- [Material design](https://www.google.com/design/spec/material-design/introduction.html#)
- [Animation](https://www.google.com/design/spec/animation/authentic-motion.html#)
    + Do's and dont's

-----

## Some ideas
https://jsfiddle.net/livibetter/HV9HM/
https://ihatetomatoes.net/simple-parallax-scrolling-tutorial/
https://davidwalsh.name/demo/background-animation-css.php

### Moving stars animation
- TODO: research
- Possibly change background position by CSS

### Scrolling Effects 1
- When scrolling up and reaching the top, an object stays at the top of the page.

### Scrolling Effects 2
- When the page is scrolling, objects will move at different speeds.

### Profile picture
- Black and white
- Crop the face

### Responsive design
- Read Luke W's articles.

-----

## Fancy animation example
- Adobe Illustrator
- Create multple images that are slightly different
- Save as svg
- IMPORTANT: Do not manipulate positions or margins because they are expensive. Instead, use [CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform).
- [How to apply multiple transforms in CSS](http://stackoverflow.com/questions/10765755/how-to-apply-multiple-transforms-in-css)
- [CSS EASING ANIMATION TOOL](https://matthewlein.com/ceaser/)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <img id="swish1" class="swish" src="img/item1.svg" alt="">
    <img id="swish2" class="swish" src="img/item1.svg" alt="">
    <img id="swish3" class="swish" src="img/item1.svg" alt="">
</body>
</html>

```

```scss
/* Make the dimensions 100% of the display size.*/
html, body {
    width: 100vw;
    height: 100vw;
    overflow: hidden;
}

/* Before load */
.swish {
    position: absolute;
    right: 5%;
    bottom: 5%;
    opacity: .5;
    right: -100%; /* Off the screen */
    transform-origin: bottom right;
    transition: all 1s ease-in;
}

/* After load */
#swish1.in {
    transform: rotate(0deg);
    transform-origin: bottom right;
}
#swish2.in {
    transform: rotate(15deg);
    transform-origin: bottom right;
}
#swish3.in {
    transform: rotate(30deg);
    transform-origin: bottom right;
}
```

```js
$(document).ready( function() {
    $(".swish").addClass("in");
});
```

---
