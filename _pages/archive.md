---
layout: page
title: Archive
permalink: /archive  # Specify the permalink because this file is not in the root.
---

## Blog Posts

{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url | prepend: site.baseurl }})
{% endfor %}
