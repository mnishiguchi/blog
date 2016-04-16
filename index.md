---
layout: page
title: Home
---

<section class="introduction">
  Hi, I am Masatoshi Nishiguchi, an aspiring programmer who loves coding
  and is passionate about building web applications.
  I am originally from Japan, but currently live in the United States in Washington, DC.
</section>

<br />

<h2 class="h1">
  Tools
</h2>
MacBook Air, iTerm, Atom, Sublime Text

<h2 class="h1">
  Programming
</h2>

### Specialize in:
Web development using Semantic HTML, CSS, JS, Ruby, Rails and AngularJS

### Did:
HTML5, CSS3, SASS, JavaScript, Rails,
AngularJS, Angular2, ReactJS, Jekyll, WordPress,
Ruby, Java (Android), Python, C/C++, PHP,
Linux, Git,
Adobe Photoshop, Adobe Illustrator, Adobe InDesign

<h2 class="h1">
  Natural languages
</h2>
Japanese(Fluent), English(Proficient), Spanish(Intermediate)

<h2 class="h1">
  Recent posts
</h2>

{% include posts_list.html limit=3 %}


<!--
<div class="posts">
  {% for post in paginator.posts %}
  <article class="post">
    <h1 class="post-title">
      <a href="{{ site.baseurl }}{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date_to_string }}</time>

    {{ post.content }}
  </article>
  {% endfor %}
</div>

<div class="pagination">
  {% if paginator.next_page %}
    <a class="pagination-item older" href="{{ paginator.next_page_path | prepend: site.baseurl }}">Older</a>
  {% else %}
    <span class="pagination-item older">Older</span>
  {% endif %}
  {% if paginator.previous_page %}
    <a class="pagination-item newer" href="{{ paginator.previous_page_path | prepend: site.baseurl }}">Newer</a>
  {% else %}
    <span class="pagination-item newer">Newer</span>
  {% endif %}
</div>
 -->
