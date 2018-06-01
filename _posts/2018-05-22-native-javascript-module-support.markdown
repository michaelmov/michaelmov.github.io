---
layout: post
title:  "Native ES6 Module Browser Support is Here!"
date:   2018-05-22
categories: frontend javascript es6
comments: true
---

One of many things that make JavaScript awesome is it's low barrier to entry. All we need to get started is a text editor and a browser. With just a few lines of code, we can get something up and running on the screen in no time. This low barrier is crucial to anyone starting out as it leads to instant gratification. In fact, it was for this reason that I chose JavaScript as my go-to programming language when I was starting out as a developer.

Over the last few years, the JavaScript ecosystem has rapidly evolved. This evolution is great for web development in general. However, with the introduction of ES6 (or ES2015) and the onslaught of compilers and build systems, it has become an increasingly complex matter to get started writing JavaScript in the browser. 

Now, don't get me wrong, we can still use the previous version of JavaScript (ES5) and it will run just fine in every modern browser. In fact, all of the compilers and build systems simply compile ES6 to ES5. But if we want to learn and use the latest JavaScript features natively in the browser, it has not been as simple as including a script tag. In order to get ES6 working, we first need to set au a build system such as Webpack, Gulp, or Browserify- which will run our code through a compiler such as Babel or Traceur, and then bundle everything into a single ES5 JavaScript file that we can reference in our HTML via a `<script>` tag. That is A LOT of steps to go through just to get some JavaScript running in our browsers. Each one of these steps can lead you down a rabbit hole and this can be very discouraging for anyone starting out.

Thankfully, browsers have been slowly enabling ES6 features. At the time of this writing all major browsers support ES6 natively to some extent, so modern JavaScript is becoming more approachable again. Yay! However, one key feature of ES6 that hasn't been natively supported is Modules. Until recently. Starting May 1st, 2018 all current versions of modern browsers support ES6 Modules! I believe that native browser support of modules is key to lowering the barrier to entry into JavaScript once again, which I find very exciting.

### What are ES6 modules?
Simply put, ES6 modules allow us to export objects from one javascript file and import them into another js file as a dependency. But before I dig deeper into modules, it makes sense to quickly cover a couple traditional approaches of getting multiple javascript into the browser.

#### Multiple script tags
The easiest and most straightforward approach of including multiple javascript files in the browser is by referencing the files using multiple `<script>` tags:


#### Bundle into a singe JS file.



#### Native ES6 Modules



### What about my bundling system?