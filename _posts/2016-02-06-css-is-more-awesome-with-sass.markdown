---
layout: post
title:  "CSS is More Awesome with SASS"
description: "Make your CSS more DRY and reusable with the power of SASS."
date:   2016-02-06
categories: frontend css sass
comments: true
---

If you are web designer or developer one of the buzzwords you hear almost daily is CSS-Preprocessors. Sounds complicated doesn’t it? In fact, many web professionals (including myself) are reluctant to try a CSS pre-processor when it is suggested to us. We say things like “I’m really good at writing CSS, I don’t need help!” or “ I don’t need to introduce another complexity into my workflow”. The truth is that if you already know how to write CSS, you will feel right at home creating your stylesheets with a CSS pre-processor like SASS, LESS, or Stylus. In this article, I will focus on SASS specifically, and share with you a few of the reasons why I switched to using SASS for all of my web projects. Getting started with SASS is easy, and you can integrate it into your workflow immediately. Once you learn what SASS is capable of, you will wonder how you ever wrote your CSS without it.

### The Dry Principle
For any software engineer, the DRY principle is no foreign concept. DRY stands for Don’t Repeat Yourself. Andy Hunt and Dave Thomas formulated and coined the DRY principle in their book [The Pragmatic Programmer](https://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X) . The DRY principle is stated as:

>“Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.”

Basically, the idea is that we write commonly-repeated patterns once and use them throughout the application (or stylesheets in our case). This makes our code more efficient and easier to maintain.

CSS is the furthest thing from DRY. A typical CSS stylesheet if full of repeated declarations, rules and styles. When writing CSS, we are constantly writing and re-writing the same code snippets for styles, fonts and colors. This will make any software engineer weep.

#### Variables
Variables are one of the features in SASS that help us follow the DRY principle. With the help of variables, we can declare a color or a fixed width and reuse it throughout our stylesheet.

Suppose you are working on a website and your primary color is `#d1d1d1`. With plain CSS, you may declare background: `#d1d1d` and color: `#d1d1d1` in dozens of classes throughout your stylesheet. Then, on the next day,  your client or boss decides to change the primary color to `#313131`. Yikes! You now have to find all occurrences of  `#d1d1d1` and replace them with `#313131`. This can be quite a hassle.

In SASS, you could simply declare a variable $primary-color: `#d1d1d1`; and then use that variable throughout your stylesheet like so: background: `$primary-color`;. If  later you need to change the primary color to `#313131`, all you have to do is change the `$primary-color` value and recompile your stylesheet. Easy! Here’s an example of what your SASS code would look like in compared to plain CSS:


**SCSS:**

``` scss
$primary-color: #d1d1d1;

.navbar {
    background: $primary-color;
}

p {
    color: $primary-color;
}

.footer {
    color: $primary-color;
}
```

**Plain CSS:**
``` css
.navbar {
    background: #d1d1d1;
}

p {
    color: #d1d1d1;
}

.footer {
    color: #d1d1d1;
}
```


#### Mixins
Mixins are another feature in SASS that allows us to reuse existing snippets of code. As a developer, I think of mixins as functions in a programming language like JavaScript or PHP. The best part of mixins is that we can pass parameters into them just as we would into a function. Now that’s DRY! Here’s an example:

**SCSS:**

``` scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;

}
```

In the above example, we are passing `$radius` as a parameter and assigning it to each of the vendor prefixes for border-radius. Then, we can use our mixin as a CSS declaration by using `@include` followed by name of of our mixin like so:

``` scss
.post-thumbnail {
     @include border-radius(8px);
}
```

Once compiled the resulting CSS looks like this:

**Plain CSS:**
``` css
.post-thumbnail {
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  border-radius: 8px;
}
```

As you see, mixins can really save us a lot of time by allowing us to write our declarations once and reuse them thought our stylesheets.


#### Extend (Inheritance)
Extend is probably the one feature of SASS that I use the most in helping me keep my SASS stylesheets DRY. By using `@extend` I can share a set of properties from one selector to the next. For example:

**SCSS:**

``` scss
.notification {
  border: 1px solid #ccc;
  width: 250px;
  height: 50px;
  background-color: #333;
}

.left {
  @extend .notification;
  float: left;
}

.right{
  @extend .notification;
  float: right;
}
```

In the above code we are basically taking all of the properties of `.notification`, applying them to `.left` and `.right`, and then further extending those selectors with their own unique properties. Once compiled, the CSS output is:

**Plain CSS:**
``` css
.notification, .left, .right {
  border: 1px solid #ccc;
  width: 250px;
  height: 50px;
  background-color: #333;
}

.left {
  float: left;
}

.right{
  float: right;
}
```



### More Readable and Maintainable Code
In pure CSS, when we need to apply a style to a specific HTML element that is nested multiple levels below it’s parent element, we will typically target the child element by attaching it to the parent element. Let’s look a the following HTML snippet as an example:
``` html
<div class="sidebar">
    <div class="author-info">
        <p>Insert author info</p>
    </div>
    <div class="navigation">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </div>
</div>
```

Suppose, I want to change the color of my navigation links in the above example to red. In pure CSS I would target my navigation links like so:

**Plain CSS:**
``` css
.sidebar .navigation ul > li > a {
    color: red;
}
```

Pretty straightforward, right? Now, let’s say I want to remove the default bullet points from my `<li>` elements. In order to do that,  I would have to add a similar snippet of code that targets the `<li>` element specifically. Here’s my CSS now:

**Plain CSS:**
``` css
.sidebar .navigation ul > li > a {
    color: red;
}
.sidebar .navigatino ul > li {
    list-style-type: none;
}
```

As you can see, things can get pretty repetitive quickly and when we have large stylesheets full of these repetitive declarations, maintenance and readability become an nightmare. Wouldn’t it be nice if we could create nest our classes in CSS the same way we nest them in HTML, thus creating the same nesting structure? We can with SASS:

**SCSS:**
``` scss
.sidebar {
    .navigation {
        li {
            list-style-type: none;
            a {
                color: red;
            }
        }
    }
}
```

Ahhhh….much better! Our classes and child elements are now structured the same way as our HTML, making our code more contextual and a lot easier to read and maintain.



### Fewer HTTP Requests = Improved Performance
One of the best ways to keep our CSS stylesheet organized is to split them up into multiple stylesheets by using the `@import` attribute. The problem with this approach in CSS is that the master stylesheet is compiled in the browser. This means that every `@import` we need to make an HTTP request to the server, which will slow down the load time of your website. In SASS, organizing our stylesheet is no different from CSS. We can still use the `@import` attribute inside of our master `style.scss` file, but because SASS uses a Ruby compiler for pre-processing locally, we end up with just a single `style.css` on our website which requires only one HTTP request to load. Performance improvement win!


### Closing Words
With all of my favorite features mentioned above. I would highly encourage anyone who is a developer or designer to give SASS a go. It will change you workflow in a major way and you will only build on top of your existing CSS knowledge. Have included a few useful resources below that have helped me get started with SASS. I hope you find them useful.


### Useful Resources
* [Official SASS Website](http://sass-lang.com/) – Has great documentation to get you started.
* [Ryan Christiani’s Getting started with Grunt and SASS](http://ryanchristiani.com/getting-started-with-grunt-and-SASS/) – Great tutorial for setting up Grunt with SASS so that you can easily compile your SASS code into CSS.
* [Build An HTML5 Template With Bootstrap & SASS](https://www.youtube.com/playlist?list=PLillGF-RfqbbpWowfjk9_Vv8XUuTBFPut) – Video tutorial by Brad Traversy. Very thorough and easy to follow.