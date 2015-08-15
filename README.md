showjunkie-webapp
=====

#### Notes

- music recommendation API: http://www.tastekid.com/read/api
- server side validation: https://github.com/ctavan/express-validator/blob/master/README.md


#### Getting started
```
$ git clone <this_repo>
$ npm install
$ cd public && bower install
$ cd ..
$ node server
```

### Deploy to heroku

```
$ heroku create showjunkie
$ heroku config:set NODE_ENV=production
$ heroku addons:create mongolab:sandbox 
$ heroku config | grep MONGOLAB_URI # Add this to config/env.js['production']['db']
$ git push heroku master
$ heroku ps:scale web=1
```