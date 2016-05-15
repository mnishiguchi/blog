---
layout: post
title: Deploying Rails app to Heroku
comments: true
tags:
- ruby
- rails
- heroku
---

This is my memo on deploying Rails app to Heroku.

<!--more-->

## About Heroku
- A hosted platform built specifically for deploying Rails and other web applications.
- Makes deploying Rails applications ridiculously easy as long as your source code is under version control with Git.
- Uses the PostgreSQL database (NOTE: You need to add the 'pg' gem to allow Rails to talk to Postgres)


## Heroku setup (one time per machine)
- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)


## Create a Heroku repo for the app
```bash
$ git commit -am "Add hello" # Make sure that all changes are committed.
$ heroku create
```


## Push the app to the Heroku repo

### On a production site, with little traffic

```bash
$ [bundle exec] rake test
$ git push heroku master     # Push up to Heroku repo
$ heroku run rake db:migrate # Inform Heroku of our db schema
```

### On a production site, with significant traffic (maintenance mode)

```bash
$ [bundle exec] rake test
$ heroku maintenance:on

$ git push heroku master     # Push up to Heroku repo
$ heroku run rake db:migrate # Inform Heroku of our db schema

$ heroku maintenance:off
```

### Deploy the app, and populate the production database with sample users

```bash
$ bundle exec rake test

$ git push heroku master     # Push up to Heroku repo
$ heroku pg:reset DATABASE   # reset the production database

$ heroku run rake db:migrate
$ heroku run rake db:seed

$ heroku restart
```


## Heroku Commands
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command)

### Renaming the URL
- NOTE: Don’t forget to change necessary configurations because renaming the project will cause its url to change as well.

```bash
$ heroku rename <new-name>
```


## Diagnose problems at Heroku
- `$ heroku logs`
- `$ heroku run rails console`
- `$ heroku run console --sandbox`


## [Delete and Redeploy Rails app to heroku](http://stackoverflow.com/questions/22043111/delete-and-redeploy-rails-app-to-heroku)

### 1. Destroy the app
- `$ heroku apps:destroy --app example`

### 2. Create a new one
- `$ heroku create example`

### 3. Push to it
- `$ git push heroku -u master`


## Heroku config variables
[Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)


## Reference
- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)
- [Deploying with Git](https://devcenter.heroku.com/articles/git)
