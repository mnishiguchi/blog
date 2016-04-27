---
layout: page
title: Projects
permalink: /projects  
# Specify the permalink because this file is not in the root.
---

{% for project in site.data.projects %}
## {{ project.title }} TEST
{{ project.description }}

---

{% endfor %}
