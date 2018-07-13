---
layout: post
title:  "How to Use ES6 and Webpack With Jekyll"
description: "A guide to setting up a simple Webpack build process to use ES6 in a Jekyll site"
hero-image: "/assets/images/jekyll-and-webpack-hero.jpg"
og-image: "/assets/images/jekyll-and-webpack-hero.jpg"
date:   2018-07-12
categories: frontend javascript es6 jekyll webpack
comments: true
---

Everyone knows that Webpack is awesome for bundling JavaScript projects. It has powerful features and is very customizeable. Likewise, Jekyll is an excellent static site generator. In fact, I use Jekyll for this website. Recently, I wanted to use ES6 on my website, so naturally I went straight to Webpack to solve this problem. 

In summary, what we are going to do is compile our ES6 code into an ES5 bundle and place it in Jekyll's main `/assets` directory. Then we will have Jekyll's server watch for changes and reload the page every time it detects a change in our JavaScript code.

The steps below outline the setup process:

### Initialize NPM
In the root of your Jekyll project run:
```
npm init
```

You should now see `package.json` in the root directory.


### Create a directory for JavaScript source files
First, we are going to create a source directory in the root of our Jekyll project and call it "webpack". This directory will contain our ES6 source files that will be compiled into ES5 by Webpack. Inside of it, we will create a file and name it `main.js`. Our Jekyll root directory should now look something like this:

```
├── 404.html
├── CNAME
├── Gemfile
├── Gemfile.lock
├── _config.yml
├── _data
├── _includes
├── _layouts
├── _portfolio
├── _posts
├── _sass
├── _site
├── assets
├── index.md
├── package-lock.json
├── package.json
├── portfolio.md
└── webpack
    └── main.js
```
### Install webpack and loaders
Now, let's install webpack and all of the necessary loaders/presets as dev dependencies:

```
npm install webpack webpack-cli babel-core babel-loader babel-preset-env --save-dev
```



### Add webpack.config.js
We are going to create a webpack config file and give it instructions on how to bundle our ES6 code:

webpack.config.js:
``` javascript
const path = require('path');


module.exports = {
  mode: 'production',
  watch: true,
  entry: path.join(__dirname, 'webpack', 'main'),
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'assets/js')
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ["env"]
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
};
```

This config file is very basic and simply compiles our `main.js` file into an ES5 bundle, names is `main-bundle.js` and places it in Jekyll's default `/assets/js` directory- from which our javascript file will be served.


### Update package.json
The last step of this process is to let Jekyll's local dev server know when our JavaScript files change so that it can automatically reload the page during development. To achieve this, we first have to start Webpack and then simultaneously fire up the Jekyll server with livereload. We can do this with the following command:


``` bash
./node_modules/.bin/webpack --watch | bundle exec jekyll serve --livereload --incremental
```

As you see, this is a long command to have to remember and type out every single time we want to run our site locally, so to make our life easier, we will add it to our `package.json` scripts so that we can simply start our local dev server with `npm start`

package.json:
``` javascript
{
  "name": "michaelmov.github.io",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "./node_modules/.bin/webpack --watch | bundle exec jekyll serve --livereload --incremental",
    "build": "./node_modules/.bin/webpack | bundle exec jekyll build"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/michaelmov/michaelmov.github.io.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/michaelmov/michaelmov.github.io/issues"
  },
  "homepage": "https://github.com/michaelmov/michaelmov.github.io#readme",
  "devDependencies": {
    "babel-core": "^6.21.0",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.7.0",
    "webpack": "^4.8.3",
    "webpack-cli": "^2.1.5"
  },
  "dependencies": {
    "highlight.js": "^9.12.0"
  }
}
```


### Enjoy!
That's it! With just a few simple steps, we can now take full advantage of JavaScripts powerful ES6 features on our Jekyll site.
