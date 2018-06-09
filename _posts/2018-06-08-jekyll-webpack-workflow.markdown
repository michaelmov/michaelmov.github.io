---
layout: post
title:  "How to Set up a Simple Jekyll and Webpack Workflow"
description: "A guide to setting up a simple Webpack build process to use ES6 in a Jekyll site"
hero-image: "/assets/images/jekyll-and-webpack-hero.jpg"
og-image: "/assets/images/jekyll-and-webpack-hero.jpg"
date:   2018-06-08
categories: frontend javascript es6 jekyll webpack
comments: true
---

This is the first paragraph...

``` javascript
const path = require('path');

module.exports = {
  mode: 'production',
  watch: true,
  entry: {
    article: path.join(__dirname, 'webpack', 'article')
  },
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