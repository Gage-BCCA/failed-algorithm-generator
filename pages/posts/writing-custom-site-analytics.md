---
title: "Writing Custom Site Analytics: Part 1"
subtitle: "Anonymous Statistics"
blurb: 
    I want to record traffic to my site, but I want to make sure that the statistics are anonymous.
    Let's practice our Javascript and system design.
tags: 
    - javascript
    - site analytics
published: 2024-08-30
---
# {{ title }}
{{ published | date: "%a, %b %d, %Y"}}
<div class="article-intro">
<p>{{ blurb }}</p>
</div>

This kind of project also helps me practice my system design a little bit, because there's a unique challenge: 

>How can I call an API using Javascript while keeping that API secure? 

I don't want bad actors enumerating my API and potentially getting access to my data. Let's dive in.

## Information Gathering
One *very* important part of this project is that the information has to be anonymous. No IP addresses, no hardware information, no geolocation, etc. So what can we gather?

Well, for starters, we can gather that a page view did, in fact, take place. Let's start there.

### Setting up the Event Listener
We'll need to set up an event listener and detect when the page loads. After the page loads, we'll wait just a few seconds to make sure the site visit was actually done by a human.

```javascript
// littleBrother.js

document.addEventListener('DOMContentLoaded', () => {
  // Only record a proper view after a few seconds has passed
  setTimeout(recordView, 2000)
});

```
I named my little started script `littleBrother.js` as a call back to Big Brother. It's just not _quite_ as bad.

First, we: 
- Add an event listener on the document for the 'DOMContentLoaded' event. Once this fires off, we know that the content on the page is loaded and the user is presumably looking at a complete web page.
- We write a quick arrow function that sets a timer
- Once the timer expires, call our `recordView` function

## Recording the View
To properly handle the view and the associated data we'll collect later, I'm going to stuff all this information into a simple class.

```javascript
// littleBrother.js

class View {
  constructor () {
    this.timestamp = new Date();
  }
}

```

we'll add a few more fields to this class later.

Now that we have a container to hold our view, lets actually record the view.

```javascript 
// littleBrother.js

function recordView () {
  console.log('View recorded.');

  // Construct the view
  let view = new View();
}
```

It's that simple. After our timer from above elapses, call this function, who creates the View object.

## Gathering More Information
I want this information to be anonymous, but I still want some more basic information. Let's also gather:
- Operating System
- What page the view is being recorded on
- The base URL for the site that the hit is recorded
- The entire path

So far, we've had it really easy: just construct a new object and get it ready to send off the server so that a "view" is recorded. Let's take it a step further.

### Gathering the OS
I did some local testing and had mixed results using some of the web APIs available in vanilla Javascript, so I came up with this:

```javascript

// Grabbing the operating system with some basic error handling
  let navigatorData = navigator.userAgentData;
  let platform;
  if (!navigatorData) {
    console.log('userAgentData not available. Using navigator.')
    navigatorData = navigator;
    platform = navigator.oscpu;
    if (!platform) {
      platform = 'Unknown';
    }
  } else {
    platform = navigatorData.platform;
  }

```

First, we attempt to grab the userAgentData object. Sometimes, though, I found this value to be `undefined` when testing on various browsers. We'll do a bit of error checking here:
1. See if the truthiness value of the `navigatorData` variable is false
2. If it is false, resort to using the regular navigator object
3. Attempt to gather the OS information from the (deprecated) `oscpu` value.
4. Finally, if this also failed, just set the OS to "unknown"

If the truthiness value of `navigatorData` is true, then we know that the userAgentData is available to us, so we can just call the platform property.

I'm almost positive there are better, more comprehensive ways to accomplish this, but this has worked for me so far. Let's adjust our View class.

```javascript
class View {
  constructor () {
    this.timestamp = new Date();
    this.platform;
  }
}
```

Now, we can set this property.

```javascript
// littleBrother.js

function recordView () {

  console.log('View recorded.');
  console.log(navigator.appName);

  // Grabbing the operating system with some basic error handling
  let navigatorData = navigator.userAgentData;
  let platform;
  if (!navigatorData) {
    console.log('userAgentData not available. Using navigator.')
    navigatorData = navigator;

    platform = navigator.oscpu;
    if (!platform) {
      platform = 'Unknown';
    }
  } else {
    platform = navigatorData.platform;
  }

  // Construct the view and get it ready for transport
  let view = new View();
  view.platform = platform;
}

```

### Gathering URL Information
This part is super easy, but super important to accurately track page views. Since we already constructed our View object earlier, and I don't have to do much extra work here, I'm going to add and directly set some new properties on my View class.

```javascript
class View {
  constructor () {
    this.timestamp = new Date();
    this.platform;
    this.path;
    this.site;
    this.fullURL;
  }
}
```

Now we simply set the values like so in the `recordView` function.

```diff-javascript
// littleBrother.js

function recordView () {
  // Let the unload script know that this isn't a bounce visit
  bounceVisit = false

  console.log('View recorded.');
  console.log(navigator.appName);

  // Grabbing the operating system with some basic error handling
  let navigatorData = navigator.userAgentData;
  let platform;
  if (!navigatorData) {
    console.log('userAgentData not available. Using navigator.')
    navigatorData = navigator;

    platform = navigator.oscpu;
    if (!platform) {
      platform = 'Unknown';
    }
  } else {
    platform = navigatorData.platform;
  }

  // Construct the view and get it ready for transport
  let view = new View();
   view.platform = platform;
+  view.path = window.location.pathname;
+  view.site = window.location.origin;
+  view.fullURL = window.location.href;
}

```

That's it! We now have some basic stats that are indeed anonymous.

## That's All For Now
We now have some decent information that we can record in a datastore. That's all we'll do for now, as we'll need to actually start designing our system next, and recruit some help from our friendly cloud compute providers.

# A Note for the Snoopy Among My Dear Readers
This file is not being distributed with the site just yet, so don't go looking for it! I want to have the system in place before taking up your bandwidth with an extra HTTP request.