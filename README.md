# Blog

Masatoshi Nishiguchi's blog built on Poole.

---

## [Poole](https://github.com/poole/poole)
Poole is the butler for [Jekyll](http://jekyllrb.com), the static site generator. It's designed and developed by [@mdo](https://twitter.com/mdo) to provide a clear and concise foundational setup for any Jekyll site. It does so by furnishing a full vanilla Jekyll install with example templates, pages, posts, and styles.

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

---

## Reference

#### Jekyll

- [Is Jekyll Better Than Joomla! and WordPress?](http://digitalshore.io/jekyll-better-choice-than-joomla-wordpress/)
- [Getting Started with Jekyll](https://scotch.io/tutorials/getting-started-with-jekyll-plus-a-free-bootstrap-3-starter-theme) by Scotch
- [Make a Static Website with Jekyll](https://www.taniarascia.com/make-a-static-website-with-jekyll/) by Tania Rascia
- [How I Created a Beautiful and Minimal Blog Using Jekyll, Github Pages, and poole](http://joshualande.com/jekyll-github-pages-poole/) by Joshua Lande
- [Using a custom domain with GitHub Pages](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)

#### Web design
- [Codrops](http://tympanus.net/codrops/) - Ideas for UI
 design](https://www.google.com/design/spec/material-design/introduction.html#)
- [Animation - Authentic motion](https://www.google.com/design/spec/animation/authentic-motion.html#)
- [Sticky div](https://jsfiddle.net/livibetter/HV9HM/)

---

## Some ideas

### Background scrolling
- https://davidwalsh.name/demo/background-animation-css.php

### Moving stars animation
- Possibly change background position by CSS

### Scrolling Effects 1
- When scrolling up and reaching the top, an object stays at the top of the page.

### Scrolling Effects 2
- When the page is scrolling, objects will move at different speeds.

### Profile picture
- Black and white
- Crop the face

### Responsive design
- Read [Luke W's articles](http://www.lukew.com/presos/)

### Parallax-scrolling
- https://ihatetomatoes.net/simple-parallax-scrolling-tutorial/

---

## GitHub Pages and GoDaddy Setup
- https://medium.com/@LovettLovett/github-pages-godaddy-f0318c2f25a#.ard50ejan
- http://andrewsturges.com/blog/jekyll/tutorial/2014/11/06/github-and-godaddy.html

### The objective
- Use the following URLs for my website instead of the `github.io` urls:
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
