---
layout: post
title:  "AngularJS-like Two-way Data Binding with Vanilla JS"
date:   2018-05-19
categories: frontend javascript es6
comments: true
---

AngularJS was the first front-end framework that I learned. I built my first AngularJS project two years ago and have used this framework for multiple personal and professional projects since. One of the things that immediately blew my mind about AngularJS is how easy it is to bind JavaScript data to the DOM and vice-versa using simple directives. This feature is called two-way data binding. While I have enjoyed the benefits of Angular's two-way data binding in my projects, it always felt like magic to me. Recently, I decided to experiment and see what it would take to implement my own basic version of two-way data binding using vanilla JavaScript. With the help of [Santiago García Da Rosa's Medium post](https://medium.com/frontend-fun/js-vanilla-two-way-binding-5a29bc86c787), I was able to do just that. It turns out that it isn't very complicated and no magic is involved.

For this simple example, I will be binding two text input fields (firstname and lastname) to a javascript object named `scope`. Ultimately, we want the `scope` object to be updated everytime a bound input is changed and the input to be updated when a bound scope property is changed from javascript.

### HTML 
Lets create a simple form and give it some custom attributes:

``` html
<form>
    <label for="name">First Name:</label>
    <input type="text" id="name" placeholder="Start typing..." mm-model="firstname">
    <h1 mm-bind="firstname"></h1>

    <label for="name">Last Name:</label>
    <input type="text" id="name" placeholder="Start typing..." mm-model="lastname">
    <h1 mm-bind="lastname"></h1>
</form>
```
A couple things to note:
* I am using the `mm-model` attribute on the input fields to mimick Angular's `ng-model` directive- which is used to bind the input value to the `$scope` object in the controller. In this example, I will be parsing through the `mm-model` attributes and bind their values to my own `scope` object.
* I am using the `mm-bind` attribute on the `<h1>` tags to bind scope properties to them. This allows me to update the DOM in real-time as the state of the`scope` object is updated.
    
### JavaScript
First, I will cache all of DOM elements with my custom attributes and then initialize the `scope` variable to a an empty object. This variable will hold all of the bound property/value pairs and keep them in sync with the DOM. 

``` javascript
// Cache DOM elements
const inputElements = document.querySelectorAll('[mm-model]');
const boundElements = document.querySelectorAll('[mm-bind]');
// Initialize scope variable to hold the state of the model.
let scope = {};

...

```
Next, I will create an `init` function that must be invoked as soon as the DOM is ready.

``` javascript
function init() {
    // Loop through input elements
    for (let el of inputElements) {
        if (el.type === 'text') {
            // Get property name from each input with an attribute of 'mm-model'
            let propName = el.getAttribute('mm-model');
            
            // Update bound scope property on input change
            el.addEventListener('keyup', e => {
                scope[propName] = el.value;
            });

            // Set property update logic
            setPropUpdateLogic(propName);
        }
    }
};
```
A few notes about the `init` function:
* This function loops through all input fields with the custom `mm-model` atribute, and adds a `keyup` event listener to them.
* The the event listener callback assigns the input value to the the matching property of the `scope` object.
* `propName` is into the `setPropUpdateLogic` funciton (below).

Finally, I am going to create the `setPropUpdateLogic` function which is invoked as the last step of the `init` function. This function contains the logic that handles all DOM updates when any property of the `scope` object is changed. The key to achieving this is the use of JavaScript's [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) functionality, which allows us to use `get` and `set` functions to handle changes to the `scope`. 

``` javascript
function setPropUpdateLogic(prop) {
    if(!scope.hasOwnProperty(prop)) {
        let value;
        Object.defineProperty(scope, prop, {
                // Automatically update bound dom elements when a scope property is set to a new value
            set: (newValue) => {
                value = newValue;

                // Set input elements to new value
                for (let el of inputElements) {
                    if(el.getAttribute('mm-model') === prop) {
                        if(el.type) {
                            el.value = newValue;
                        }
                    }  
                }
                // Set all other bound dom elements to new value
                for (let el of boundElements) {
                    if(el.getAttribute('mm-bind') === prop) {
                        if (!el.type) {
                            el.innerHTML = newValue;
                        }
                    }
                }
            }, 
            get: () => {
                return value;
            },
            enumerable: true
        })
    }
};
```
Key notes about `setPropUpdateLogic`:
* First, I receive the prop as a parameter and check for it's existence in `scope`. Then, I define the logic that handles changes to the prop by passing an object with a `set` function. 
* You can think `set` inside of `Object.defniteProperty` object as a callback that gets invoked everytime a given poperty's value is changed. 


### Result
That's it! As you see, it's fairly simple to create simple two-way data binding found in AngularJS and other JavaScript frameworks. Of course, my implmentation is as basic as it gets and covers the most basic of use cases, but it has certainly helped me understand what goes on behind the scenes when working with two-way data binding.

 Here's a [JSFiddle](https://jsfiddle.net/michaelmov/5zj353vr/): 
<iframe width="100%" height="500" src="//jsfiddle.net/michaelmov/5zj353vr/embedded/js,html,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>