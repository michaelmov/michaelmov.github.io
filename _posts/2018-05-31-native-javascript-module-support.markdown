---
layout: post
title:  "Native ES6 Module Browser Support Is Here!"
description: "ES6 module awesomeness is now available in browsers near you."
hero-image: "/assets/images/es6-modules-browser-support-hero.jpg"
og-image: "/assets/images/es6-modules-browser-featured.jpg"
date:   2018-05-31
categories: frontend javascript es6
comments: true
---

One of many things that make JavaScript awesome is it's low barrier to entry. All we need to get started is a text editor and a browser. With just a few lines of code, we can get something up and running on the screen in no time. This low barrier is crucial to anyone starting out as it leads to instant gratification. In fact, it was for this reason that I chose JavaScript as my go-to programming language when I was starting out as a developer.

Over the last few years, the JavaScript ecosystem has rapidly evolved. This evolution is great for web development in general. However, with the introduction of ES6 (or ES2015) and the onslaught of compilers and build systems, it has become an increasingly complex matter to get started writing JavaScript in the browser. 

Now, don't get me wrong, we can still use the previous version of JavaScript (ES5) and it will run just fine in every modern browser. In fact, all of the compilers and build systems simply compile ES6 to ES5. But if we want to learn and use the latest JavaScript features natively in the browser, it has not been as simple as including a script tag. In order to get ES6 working, we first need to set au a build system such as [Webpack](https://webpack.js.org/), [Gulp](https://gulpjs.com/), or [Browserify](http://browserify.org/)- which will run our code through a compiler such as [Babel](https://babeljs.io/) or [Traceur](https://github.com/google/traceur-compiler), and then bundle everything into a single ES5 JavaScript file that we can reference in our HTML via a `<script>` tag. That is A LOT of steps to go through just to get some JavaScript running in our browsers. Each one of these steps can lead you down a rabbit hole and this can be very discouraging for anyone starting out.

Thankfully, browsers have been slowly enabling ES6 features. At the time of this writing all major browsers support ES6 natively to some extent, so modern JavaScript is becoming more approachable again. Yay! However, one key feature of ES6 that hasn't been natively supported is Modules, until recently. Starting May 1st, 2018, all current versions of modern browsers support ES6 Modules! I believe that native browser support of modules is key to lowering the barrier to entry into JavaScript once again, which I find very exciting.

### The How
To get started, I will create a file called `greeting.js` and export a `Greeting` class from it. This will be our module.

###### greeting.js:
```javascript
export default class Greeting {
    constructor(greeting) {
        this.greeting = greeting;
    }

    greet() {
        return this.greeting;
    }
}
```
As you see, this is just a class that takes in a greting as a consturctor param and returns it when the `greet()` method is called. Simple stuff.

Now, I am going to create another file called `main.js` that will be the main file that will import our `Greeting` module and bootstrap our mini application:

###### main.js:
``` javascript
import Greeting from './greeting.js';

const myGreeting = new Greeting('Hello');

document.querySelector('#greeting').innetHTML = `<h1>${myGreeting.greet()} World!</h1>`;
```
Again, simple stuff. I simply `import` my `Greeting` class, create an instance of it, and then attach then append the returned greeting to DOM as an `<h1>` tag. 

Finally, the exciting part of referencing the above javascript in the `index.html` file. 

###### index.html:
``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>JS Modules</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Notice the type="module" attribute on the script tag -->
    <script type="module" src="main.js"></script>
</head>
<body>
    <div id="greeting"></div>
</body>
</html>
```
A couple notes:
* I am only referencing the `main.js` file in the head element. I don't need to reference my `greeting.js` file because it is being imported into `main.js`.
* I am using `type="module"` to tell the browser that `main.js` contains reference to module(s). **This is the key to enablig modules.**

That's it! As you see, it is as easy as adding `type="module"` to the `<script>` tag to beging using es6 modules natively in the browser.


### Final Words
Native support of ES6 modules is very exciting to me, because it once again allows me to quicky expriment and build in the browser without the hassle of having to set up a compile/build system. It brings back the playful nature of javascript, but most importantly lowers the barrier to entry into the JavaScript world once again :). 

Of course, I am not suggesting the we ditch our build systems and swtich over to native es6 modules. If you are creating production apps, you should be building and minifying your JS code anyway for performance and browser compatibility reasons. 

### Browser Support
![ES6 Modules Browser Support](/assets/images/es6-modules-browser-support.png "ES6 Modules Browser Support"){:.tofigure}

