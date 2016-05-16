---
layout: post
title: Heroku troubleshooting
comments: true
tags:
- ruby
- rails
- heroku
---

This is my memo on *{{ page.title }}*.

<!--more-->

## Troubleshooting

### Diagnose problems at Heroku
- `$ heroku logs`
- `$ heroku run rails console`
- `$ heroku run console --sandbox`

### Heroku deployment error H10 (App crashed)
- Didn’t you modify db or something?
- Most likely something is broken in your code (association etc).

### Check if the production database is up-to-date
```bash
$ git push heroku master     # Push up to Heroku repo
$ heroku pg:reset DATABASE   # reset the production database
```

### [Missing CSS on Heroku Deployment](https://teamtreehouse.com/forum/missing-css-on-heroku-deployment)
- [Rails Asset Pipeline on Heroku Cedar](https://devcenter.heroku.com/articles/rails-asset-pipeline)
- `$ rake assets:precompile`
- `$ RAILS_ENV=production bundle exec rake assets:precompile`

### [Check if the current Heroku app name is registered](http://stackoverflow.com/questions/2947190/pushing-app-to-heroku-problem)

```bash
$ git remote -v
$ git remote rm heroku
$ git remote add heroku git@heroku.com:APP_NAME.git
```

### Heroku push rejected, failed to compile Ruby/rails app
- Remove the `Gemfile.lock` file
- Run `bundle install`
- Run `git add`, `git commit` and `git push`

![]({{ site.baseurl }}/images/20160513_heroku_error_fails_to_push_some_refs.png)

### js files not loading in production but working well locally
- Require all the necessary script files in `app/assets/javascripts/application.js`
- Precompile the assets for production

```bash
# Precompile the assets for production
$ RAILS_ENV=production bundle exec rake assets:precompile
# Note: If Devise.secret_key is not set, add one to your Devise initializer
```

### [Check Heroku-supported Ruby/Rails versions](https://devcenter.heroku.com/articles/ruby-support#ruby-versions)
`An error occurred while installing Ruby ruby-x.y.z`

### Check if Sendgrid is configured (if applicable)
- [Configuring Rails to use SendGrid in production](https://www.railstutorial.org/book/account_activation_password_reset#code-sendgrid_config)

```bash
$ heroku addons:add sendgrid:starter
$ heroku config:get SENDGRID_USERNAME
$ heroku config:get SENDGRID_PASSWORD
```

### Check if CarrierWave & S3 are configured (if applicable)

- [Configuring the image uploader for production](https://www.railstutorial.org/book/user_microposts#code-image_uploader_production)
- [Configuring CarrierWave to use S3](https://www.railstutorial.org/book/user_microposts#code-carrier_wave_configuration)
- [Amazon Web Services](http://aws.amazon.com/)

```bash
$ heroku config:set S3_ACCESS_KEY=<access key>
$ heroku config:set S3_SECRET_KEY=<secret key>
$ heroku config:set S3_BUCKET=<bucket name>
```

### [Push to a specific app at Heroku](https://devcenter.heroku.com/articles/git)
```bash
$ heroku git:remote -a falling-wind-1624
```

### Remove build pack
```bash
$ heroku config:unset BUILDPACK_URL
```

### [Heroku deploy fails ‘Some gems seem to be missing from your vendor/cache directory’]()
```bash
$ rm -rf vendor/cache
```

### Heroku push error: “NameError: uninitialized constant Uglifier::VERSION” on rake assets:precompile
- Update `uglifier` gem’s version

## Reference
- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)
- [Deploying with Git](https://devcenter.heroku.com/articles/git)
