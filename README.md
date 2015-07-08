mean-starter
=====

#### Notes

- music recommendation API: http://www.tastekid.com/read/api


#### Getting started
```
$ git clone <this_repo>
$ npm install
$ node server
```

### Deploy to heroku
We don't use MongoDB at the moment, add it anyway.

![thanks Taylor](http://media.giphy.com/media/DvXQYuGWQ34v6/giphy.gif)

```
$ heroku create showjunkie
$ heroku config:set NODE_ENV=production
$ heroku addons:create mongolab:sandbox 
$ heroku config | grep MONGOLAB_URI # Add this to config/env.js['production']['db']
$ git push heroku master
$ heroku ps:scale web=1
```