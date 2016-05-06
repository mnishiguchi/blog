---
layout: post
title: Jekyllサイトにシンプルなタグ・カテゴリのリストを実装
comments: true
tags:
- jekyll
---

## 経緯
- 自分のJekyllサイトのブログにタグをつけたい。
- Github Pagesにデプロイするため、プラグインは使用せずシンプルな実装にしたい。

## 実装目標
- 投稿メタ（日時とタグ）の部分テンプレートを作る。
- 簡単なタグクラウドの部分テンプレートを作る。
- タグでソートされた投稿リスト専用のページを作る。

## 実装結果
- [http://mnishiguchi.com/tags](http://mnishiguchi.com/tags)

## 実装方法

#### 1. 各投稿のYAML Front Matterにタグを追加
これで、[Jekyllの変数](https://jekyllrb.com/docs/variables/)、`site.tags`と`page.tags`により
タグを取得できるようになる。

{% raw %}
```md
---
layout: post
title: Implementing tags in Jekyll site
tags:
- jekyll
---

...
```
{% endraw %}


#### 2. 投稿メタ（日時とタグ）の部分テンプレートを作成
再利用性を考慮して、部分テンプレート`_include/post_meta.html`を作った。
例えば、僕のサイトの場合、各投稿タイトルの下に置いている。

{% raw %}
```html
<!--
Obtain time and tags that are associated with current page/post.
-->
{% if post %}
  {% assign date = post.date %}
  {% assign tags = post.tags %}
{% else %}
  {% assign date = page.date %}
  {% assign tags = page.tags %}
{% endif %}

<span class="post-meta">
  <time
    datetime="{{ date | date_to_xmlschema }}"
    class="post-date">
    {{ date | date_to_string }}
  </time>

  <div class="post-tags">
    <!--
    Display all the tag names that link to a corresponding section of the Tags page.
    -->
    {% for tag in tags %}
      <a href="{{ site.baseurl }}/tags#{{ tag | slugize }}">{{ tag }}</a>
    {% endfor %}
  </div>
</span>
```
{% endraw %}


#### 3. 簡単なタグクラウドの部分テンプレートを作成
単純に全てのタグをインラインでリスト化した。オプションとしてタグのリストを渡すことができるが、
何も渡さなければ`site.tags`からタグ名の取得する仕様にした。タグクラウドのタグをクリックすることにより
投稿リストページ（後述の`tags.html`）の該当するリストへ移動することができる。

{% raw %}
```html
{% comment %}
<!--
- If tag_names array is not passed in as argument,
  - Create an empty array,
  - Obtain a tag name and push it to the array, and
  - Sort the tag names.
- List tags as a tag cloud.
-->
{% endcomment %}

{% if include.tag_names %}
  {% assign tag_names = include.tag_names %}

{% else %}
  {% assign tag_names = "" | split: "|"  %}

  {% for posts_by_tag in site.tags %}
    {% assign tag_names = tag_names | push: posts_by_tag.first %}
  {% endfor %}

  {% assign tag_names = tag_names | sort %}
{% endif %}

<ul class="tag-cloud">
  {% for tag_name in tag_names %}
    <li>
      <a href="{{ baseurl }}/tags#{{ tag_name | slugize }}">
        {{ tag_name }}
      </a>
    </li>
  {% endfor %}
</ul>
```
{% endraw %}


#### 4. タグでソートされた投稿リスト専用のページを作る。
ルートディレクトリに`tags.html`を作成。本ページ上部にはタグクラウドを置き、
その下に各タグごとに投稿エントリーのリストを表示する。

{% raw %}
```html
---
layout: page
title: Posts By Tags
permalink: /tags
---

{% comment %}
<!--
- Create an empty array.
- Obtain a tag name and push it to the array.
- Sort the tag names.
- List tags as a tag cloud.
-->
{% endcomment %}

{% assign tag_names = "" | split: "|"  %}

{% for posts_by_tag in site.tags %}
  {% assign tag_names = tag_names | push: posts_by_tag.first %}
{% endfor %}

{% assign tag_names = tag_names | sort %}

{% include tag_cloud.html tag_names=tag_names %}

<hr>

<section class="posts-by-tags">
  {% for tag_name in tag_names %}
    <div>
      <h3 id="{{ tag_name }}">
        {{ tag_name | capitalize | replace: "_", " " }}
      </h3>

      {% for post in site.tags[tag_name] %}
        <a href="{{ post.url | prepend: baseurl }}">
          {{ post.title }}
        </a>
      {% endfor %}
    </div>
  {% endfor %}
</section>
```
{% endraw %}

#### 5. 適当にスタイリング

{% raw %}
```scss
@mixin post-tag {
  padding: 0 .3rem;
  margin: 0 .1rem;
  background: $link-color;
  color: white;
  &:hover {
    text-decoration: none;
  }
}

/**
 *  Meta data line below post title
 */
.post-meta {
  display: block;
  margin-top: -.3rem;
  margin-bottom: 1rem;
  color: #9a9a9a;
  time {
    margin-right: .5rem;
  }
  .post-tags {
    display: inline-block;
    a {
      @include post-tag;
      font-size: .8rem;
    }
  }
}

/**
 * Styles for _pages/tags.html
 */
.tag-cloud {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    a {
      @include post-tag;
    }
  }
}
```
{% endraw %}
