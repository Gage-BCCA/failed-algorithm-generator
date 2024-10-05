/*

  # My Portfolio Page Javascript

  If you're reading this, you've dug way deeper than most people
  have or ever will. You are among the few. The proud. The nosy.

*/


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
    details.style.display = "block";
    elem.textContent = "Show Less";
  } else {
    details.style.display = "none";
    elem.textContent = "Show More";
  }
}

const aboutMeTabSelectors = document.getElementsByClassName("about-me-list")[0].children;
const aboutMeOutputs = document.getElementsByClassName("about-me-output-content");
for (let element of aboutMeTabSelectors){
  element.addEventListener("click", function(e) {

    for (let box of aboutMeOutputs){
      box.classList.add("hidden");
    } 

    let target = document.getElementById(this.dataset.outputId);
    target.classList.remove("hidden");

    for (let selector of aboutMeTabSelectors){
      selector.classList.remove("selected");
    }
    
    this.classList.add("selected");
  })
}
