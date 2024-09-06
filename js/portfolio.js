// Viewcounter

window.addEventListener("DOMContentLoaded", () => {
  let viewcounter = document.getElementById("viewcount");
  fetch("https://z8a2oba3s8.execute-api.us-east-1.amazonaws.com/viewcount/portfolio")
    .then((response) => { 
      console.log(response);
      return response.json();
    })
    .then((views) => {
      console.log(views);
      viewcounter.textContent = "Total Portfolio Views: "+ views[0].viewcount;
    })
    .catch((err) => {
      viewcounter.textContent = "Something went wrong with my viewcount :(";
    })
  });


// Add event listeners to the skill cards
const skillCards = document.getElementsByClassName("skill-card");
for (let card of skillCards) {
  console.log(card);
  card.addEventListener("mouseover", function focusElement() {
    let cardHeader = this.querySelector("h2");

    this.style.transitionDuration = "200ms";
    this.style.backgroundColor = "#e74c3c";
    this.style.padding = "20px";

    cardHeader.style.transitionDuration = "400ms";
    cardHeader.style.fontSize = "2rem";
  });

  card.addEventListener("mouseout", function unfocusElement(e) {
    this.style.backgroundColor = "#2c3e50";
    this.style.padding = "10px";

    let cardHeader = this.querySelector("h2");
    cardHeader.style.transitionDuration = "200ms";
    cardHeader.style.fontSize = "1.5rem";
  });
}

function showDetails(elem) {
  let projectDetailsId = "project-details-" + elem.id;
  let details = document.getElementById(projectDetailsId);
  if (details.style.display === "none") {
    console.log("DISPLAYING");
    details.style.display = "block";
    elem.textContent = "Show Less";
  } else {
    details.style.display = "none";
    elem.textContent = "Show More";
  }
}

// Add Event listeners on the interest tab selectors
const interestsTabSelectors = document.getElementsByClassName("interests-tab");
const interestContentContainers = document.getElementsByClassName("interests-content");
const interestContentContainersColors = ["#35682D", "#D84B20", "#497E76", "#AEA04B", "#1B5583", "#e74c3c"]

for (tab of interestsTabSelectors) {
  tab.addEventListener("click", activateTab);
}

function activateTab(event) {

  // Remove all active styling from tab selectors
  for (tab of interestsTabSelectors) {
    tab.classList.remove("interests-tab-active");
    tab.style.borderBottom = "none";
  }

  // Add the active class to the subject of this event
  this.classList.add("interests-tab-active");

  // Iterate through, hiding all content. If we find a content container that
  // contains the matching class to the subject of this event, cache that
  // container.
  let targetContentContainer = null;
  for (container of interestContentContainers){
    container.style.display = "none";

    if (container.classList.contains(this.classList[1])){
      targetContentContainer = container;
    }
  }

  // Set the container that was cached earlier to block
  let randomColor = interestContentContainersColors[getRandomNumberForColorPicker()];
  targetContentContainer.style.display = "block";
  targetContentContainer.style.boxShadow = "15px 8px " + randomColor;
  this.style.borderBottom = "5px solid " + randomColor;
  
}

function getRandomNumberForColorPicker(){
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(interestContentContainersColors.length - 1);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

