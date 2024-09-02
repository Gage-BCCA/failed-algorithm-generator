let bounceVisit = true

class View {
  constructor () {
    this.timestamp = new Date();
    this.platform;
    this.path;
  }
}

class BounceView {
  constructor () {
    this.timestamp = new Date();
    this.path;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Only record a proper view after a few seconds has passed
  setTimeout(recordView, 2000)
})

window.addEventListener('beforeunload', event => {
  // Record some basic information, construct a BounceView object, and get it ready for transport
  if (bounceVisit) {
    let bounce = new BounceView()
    bounce.path = window.location.pathname;
  }
})

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

  // Placeholder code to grab the end-user's IP address
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      console.log(data.ip);
    })
    .catch(error => {
      console.log('Error:', error);
    })

  // Construct the view and get it ready for transport
  let view = new View();
  view.path = window.location.pathname;
  view.platform = platform;

  console.log(view);
}
