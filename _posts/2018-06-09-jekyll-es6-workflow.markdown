---
layout: post
title:  "How to Use ES6 and Webpack With Jekyll"
description: "A guide to setting up a simple Webpack build process to use ES6 in a Jekyll site"
hero-image: "/assets/images/jekyll-and-webpack-hero.jpg"
og-image: "/assets/images/jekyll-and-webpack-hero.jpg"
date:   2018-06-09
categories: frontend javascript es6 jekyll webpack
comments: true
---

Everyone knows that Webpack is awesome for bundling JavaScript projects. It has powerful features and is very customizeable. Likewise, Jekyll is an excellent static site generator. In fact, I use Jekyll for this website. Recently, I wanted to use ES6 on my website and realized that Jekyll doesn't bundle JavaScript ES5, so naturally I went straight to Webpack to solve this problem. The steps below outline the process of integrating Webpack into a Jekyll site so that you can bundle ES6 into ES5.

### Initialize NPM
In the root of your Jekyll project run:
```
npm init
```

You should now see `package.json` at the root directory.


### Create a directory for JavaScript source files
First, we are going to create a source direcotry at the root of our Jekyll project and call it "webpack". This directory will contain our ES6 source files that will be compiled into ES5 by Webpack. In this direcoty we will create a file and name it `main.js`. Our Jekyll root directory should now look something like this:

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

### Update package.json
