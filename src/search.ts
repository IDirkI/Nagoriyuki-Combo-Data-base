// Initially display all combos before tags
window.onload = () => {
  filterCombo([]);
};

// Return an array of tags of active buttons
function getTags() {
  let tags: string[] = [];
  let buttons = document.querySelectorAll(".button-value");

  // Put tags of each active button in tags array
  buttons.forEach((button) => {
    if (button instanceof HTMLElement && button.classList.contains("active")) {
      tags.push(button.innerText.toLowerCase().replaceAll(" ", "-"));
    }
  });

  return tags;
}

// Parameter intended to pass from button, (parameter = tag)
function filterCombo(tags: string[]) {
  let currentTags = tags;
  let elements = document.querySelectorAll(".card");

  // Get all buttons
  let buttons = document.querySelectorAll(".button-value");

  // Check buttons for each tag
  currentTags.forEach((tag) => {
    buttons.forEach((button) => {
      // Button Check, loop through all buttons and compare if the selected tag matches their name. If matched the button is activated.
      if (button instanceof HTMLElement && tag.toLowerCase().replaceAll("-", " ") == button.innerText.toLowerCase().replaceAll("-", " ")) {
        // Button toggle
        if (button.classList.contains("active")) {
          button.classList.remove("active");
          currentTags = [];
        } else {
          button.classList.add("active");
        }
      }
    });
  });

  // Replaces the single tag with all active tags to allow for multi tag filering
  currentTags = getTags();

  // Get all cards
  elements.forEach((element) => {
    // Display All
    if (currentTags.length == 0) {
      element.classList.remove("hideTag");
    }

    // Prevents hiding and intsantly turning on when a card should stay hidden.
    let noConflicts = true;

    currentTags.forEach((tag) => {
      if (!element.classList.contains(tag)) {
        // Don't display combo card if it doesn't contains the tag
        noConflicts = false;
        element.classList.add("hideTag");
      }
    });

    if(noConflicts) element.classList.remove("hideTag");
    

  });
}

//Search button click
document.getElementById("search")!.addEventListener("click", () => {
  //initializations
  let searchInput = (<HTMLInputElement>document.getElementById("search-input"))
    .value;
  let elements = document.querySelectorAll(".combo-title");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (
      element instanceof HTMLElement &&
      element.innerText.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      //display matching card if its not hidden
      cards[index].classList.remove("hideSearch");
    } else {
      //hide others
      cards[index].classList.add("hideSearch");
    }
  });
});
