class View {
  constructor(navigatorUserAgentDataObject){
    this.timestamp = new Date();
    this.platform = navigatorUserAgentDataObject.platform;
    this.mobile = navigatorUserAgentDataObject.mobile; 
  }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(recordView, 2000);
  });

function recordView() {
    console.log("View recorded.");
    console.log(navigator.userAgentData.platform);
    let date = new Date();
    console.log(date);
}