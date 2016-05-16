---
layout: post
title: Creating a new Rails app
comments: true
tags:
- ruby
- rails
- postgresql
---

This is my memo on *{{ page.title }}*.

<!--more-->


## 1. Before getting started
```bash
$ ruby -v       # Ensure that Ruby is installed.
$ rails -v      # Ensure that Rails is installed.
$ git --version # Ensure that git is installed.
```

## 2. Generate a new app (with PostgreSQL)
```bash
$ cd ~/workspace
$ rails _4.2.0_ new <app_name> -d postgresql
# If the command above returns an error like “Could not find ’railties”’, it
# means you don’t have the right version of Rails installed.
$ cd <app_name>
```

## 3. In Gemfile, specify the gems needed by the app
- Include 'pg' gem.

## 4. Install the gems using Bundler
```bash
$ bundle install --without production
$ bundle update
```

## 5. Set config/database.yml (if needed)
- Username: By default, the same as your OS X user account.

## 6. Create the database
- `$ [bundle exec] rake db:create`

## 7. Check if it works on local server
- `$ rails server`
- Visit [http://localhost:3000/](http://localhost:3000/)

## 8. Hello world test

## 9. Initialze a git repo (local and remote)

## 10. [Check if it works on Heroku]({{ site.baseurl }}/2016/05/13/deploying-rails-app-to-heroku)


## Misc techniques

### Check currently installed Rails gems
- `$ gem list rails`

### Undoing generate

```bash
$ rails generate controller FooBars baz quux
$ rails destroy controller FooBars

$ rails generate model Foo bar:string baz:integer
$ rails destroy model Foo

$ rails generate scaffold Micropost content:text user:references
$ rails destroy scaffold Micropost
```

### Undoing migrate

```bash
$ [bundle exec] rake db:migrate
$ [bundle exec] rake db:rollback

# To go all the way back to the beginning, we can use
$ [bundle exec] rake db:migrate VERSION=0
```
