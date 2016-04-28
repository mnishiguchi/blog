# Blog

Masatoshi Nishiguchi's blog built on Poole.

---

## [Poole](https://github.com/poole/poole)
Poole is the butler for [Jekyll](http://jekyllrb.com), the static site generator. It's designed and developed by [@mdo](https://twitter.com/mdo) to provide a clear and concise foundational setup for any Jekyll site. It does so by furnishing a full vanilla Jekyll install with example templates, pages, posts, and styles.

---

## Special thanks to the following
- [Jekyll](http://jekyllrb.com) [[License](https://github.com/jekyll/jekyll/blob/master/LICENSE)]
- [Poole](https://github.com/poole/poole) [[License](https://github.com/poole/poole/blob/master/LICENSE.md)]
- [Subtle Click Feedback Effects](https://github.com/codrops/ClickEffects) [[License](http://tympanus.net/codrops/licensing/)]
- [SVG Drawing Animation](http://tympanus.net/codrops/?p=18012) [[License](http://tympanus.net/codrops/licensing/)]
- [Animated Background Headers]( http://tympanus.net/Development/AnimatedHeaderBackgrounds/index.html) [[License](http://tympanus.net/codrops/licensing/)]
- [Sticky div](https://jsfiddle.net/livibetter/HV9HM/)
- [Rachid Mrad](http://rachidmrad.com/) for teaching me designing

---

## Reference

#### Jekyll

- [Is Jekyll Better Than Joomla! and WordPress?](http://digitalshore.io/jekyll-better-choice-than-joomla-wordpress/)
- [Getting Started with Jekyll](https://scotch.io/tutorials/getting-started-with-jekyll-plus-a-free-bootstrap-3-starter-theme) by Scotch
- [Make a Static Website with Jekyll](https://www.taniarascia.com/make-a-static-website-with-jekyll/) by Tania Rascia
- [How I Created a Beautiful and Minimal Blog Using Jekyll, Github Pages, and poole](http://joshualande.com/jekyll-github-pages-poole/) by Joshua Lande
- [Using a custom domain with GitHub Pages](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)
- [Jekyll themes](http://jekyllthemes.org/)

#### Web design
- [Codrops](http://tympanus.net/codrops/) - Ideas for UI
- [Design - material-design](https://www.google.com/design/spec/material-design/introduction.html#)
- [Animation - Authentic motion](https://www.google.com/design/spec/animation/authentic-motion.html#)
- [CSS Image Hover Effects](http://codepen.io/nxworld/pen/ZYNOBZ)
- [The Shapes of CSS](https://css-tricks.com/examples/ShapesOfCSS/)
- [Image shapes with CSS3](http://codepen.io/CreativeJuiz/pen/Hizkh)
- [Clipping and Masking in CSS](https://css-tricks.com/clipping-masking-css/)
- [CSS clip-path maker](http://bennettfeely.com/clippy/)
- [Vendor-prefixed CSS Property Overview](http://peter.sh/experiments/vendor-prefixed-css-property-overview/)

---

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

```html
<link rel="stylesheet" href="{{ site.baseurl }}/styles.css">
```

### [Subtle Click Feedback Effects](https://github.com/codrops/ClickEffects)
- Adopted from Codrops.

### [Pagination only works within HTML files](http://jekyllrb.com/docs/pagination/)
- Pagination does not work from within Markdown or Textile files from your Jekyll site. Pagination works when called from within the HTML file, named index.html, which optionally may reside in and produce pagination from within a subdirectory, via the paginate_path configuration value.

### [Is git not case sensitive?](http://stackoverflow.com/a/8482021/3837223)
- Depends on the `core.ignorecase` configuration value.

```
sudo git config --unset-all core.ignorecase
sudo git config --system core.ignorecase false
```

### [Post excerpts](https://jekyllrb.com/docs/posts/#post-excerpts)
- `{{ post.excerpt }}` in a template
- `excerpt_separator: <!--more-->` in `_config`

### [Placing a div within a canvas](http://stackoverflow.com/questions/5763911/placing-a-div-within-a-canvas)
- Just use z-index!

### Markdown in yaml

#### Single paragraphs
```md
# Markdown enabled, however don't use more than one paragraph (enforced by `>`)
description: >
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

#### Multiple paragraphs
```md
# Markdown enabled, can use multiple paragraphs (enabled by `|`)
about:       |
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

### Creating local variables using variable tags
- https://docs.shopify.com/themes/liquid/tags/variable-tags

```md
{% assign my_variable = false %}
{% if my_variable != true %}
This statement is valid.
{% endif %}
```

### [Detect page or posts](http://stackoverflow.com/a/14090469/3837223)

```html
<div class="{% if page.id %} post {% else %} page {% endif %}">
   ...
</div>
```

---

## Some ideas

### Responsive design
- Read [Luke W's articles](http://www.lukew.com/presos/)

### Parallax-scrolling
- https://ihatetomatoes.net/simple-parallax-scrolling-tutorial/

---

## GitHub Pages and GoDaddy Setup
- https://medium.com/@LovettLovett/github-pages-godaddy-f0318c2f25a#.ard50ejan
- http://andrewsturges.com/blog/jekyll/tutorial/2014/11/06/github-and-godaddy.html

### The objective
Use the following URLs for my website instead of the `github.io` urls:
- mnishiguchi.com
- www.mnishiguchi.com

### Adding an A record on DNS manager
1. Open DNS manager
2. Select the domain name you want to use
3. Click "Edit Zone"

### Check if the change has been propagated
```bash
$ dig mnishiguchi.com +nostats +nocomments +nocmd

; <<>> DiG 9.8.3-P1 <<>> mnishiguchi.com +nostats +nocomments +nocmd
;; global options: +cmd
;mnishiguchi.com.		IN	A
mnishiguchi.com.	600	IN	A	192.30.252.153
```
