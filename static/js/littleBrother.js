const clientID = "14324234";

let bounceVisit = true;

class View {
  constructor() {
    this.timestamp = new Date();
    this.platform;
    this.path;
    this.site;
    this.clientID = clientID;
    this.fullURL;
  }
}

class BounceView {
  constructor() {
    this.timestamp = new Date();
    this.path;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Only record a proper view after a few seconds has passed
  setTimeout(recordView, 4000);
});

window.addEventListener("beforeunload", (event) => {
  // Record some basic information, construct a BounceView object, and get it ready for transport
  if (bounceVisit) {
    let bounce = new BounceView();
    bounce.path = window.location.pathname;
  }
});

function recordView() {
  // Let the unload script know that this isn't a bounce visit
  bounceVisit = false;

  // Grabbing the operating system with some basic error handling
  let navigatorData = navigator.userAgentData;
  let platform;
  if (!navigatorData) {
    console.log("userAgentData not available. Using navigator.");
    navigatorData = navigator;
    platform = navigator.oscpu;
    if (!platform) {
      platform = "Unknown";
    }
  } else {
    platform = navigatorData.platform;
  }

  // Construct the view and get it ready for transport
  let view = new View();
  view.path = window.location.pathname;
  view.site = window.location.origin;
  view.platform = platform;
  view.fullURL = window.location.href;
  sendView(view);
}

function sendView(view){
  console.log(JSON.stringify(view));
  return;
}
