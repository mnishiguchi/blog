---
layout: post
title: Deploying Rails app to Heroku
comments: true
tags:
- heroku
- rails
---

This is my memo on *{{ page.title }}*.

<!--more-->

## About Heroku
- A hosted platform built specifically for deploying Rails and other web applications.
- Makes deploying Rails applications ridiculously easy as long as your source code is under version control with Git.
- Uses the PostgreSQL database (NOTE: You need to add the 'pg' gem to allow Rails to talk to Postgres)

#### Heroku Commands
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command)

#### Heroku config variables
- [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)


## Heroku setup (one time per machine)
- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)


## Create a Heroku repo for the app
```bash
$ git commit -am "Add hello" # Make sure that all changes are committed.
$ heroku create
```

## Before deployment

```bash
$ rake assets:precompile
$ [bundle exec] rake test
$ git add -A
$ git commit -m "Commit message"
$ git push
```

## Push the app to the Heroku repo

#### On a production site, with little traffic

```bash
$ git push heroku master     # Push up to Heroku repo
$ heroku run rake db:migrate # Inform Heroku of our db schema
```

#### On a production site, with significant traffic (maintenance mode)

```bash
$ heroku maintenance:on

$ git push heroku master     # Push up to Heroku repo
$ heroku run rake db:migrate # Inform Heroku of our db schema

$ heroku maintenance:off
```

#### Deploy the app, and populate the production database with sample users

```bash
$ git push heroku master     # Push up to Heroku repo
$ heroku pg:reset DATABASE   # reset the production database

$ heroku run rake db:migrate
$ heroku run rake db:seed

$ heroku restart
```


## Rename the Heroku URL
- NOTE: Don’t forget to change necessary configurations because renaming the project will cause its url to change as well.

```bash
$ heroku rename <new-name>
```


## Diagnose problems at Heroku
- `$ heroku logs`
- `$ heroku run rails console`
- `$ heroku run console --sandbox`


## [Delete and Redeploy Rails app to heroku](http://stackoverflow.com/questions/22043111/delete-and-redeploy-rails-app-to-heroku)

#### 1. Destroy the app
- `$ heroku apps:destroy --app example`

#### 2. Create a new one
- `$ heroku create example`

#### 3. Push to it
- `$ git push heroku -u master`


## Troubleshooting
- [Heroku Troubleshooting]({{ site.baseurl }}/2016/05/13/heroku-troubleshooting/)

## Reference
- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)
- [Deploying with Git](https://devcenter.heroku.com/articles/git)
