//import Handsontable from 'handsontable';


const createButtonElement = document.querySelector('.create');
const deleteButtonElement = document.querySelector('.delete');
const existingButtonElement = document.querySelector('.existing');

const buttonsUsers = [
  { element: createButtonElement, active: false },
  { element: deleteButtonElement, active: false },
  { element: existingButtonElement, active: false }
];

let startAnimation = true;

buttonsUsers.forEach(button => {
  button.element.addEventListener('click', () => {
    buttonsUsers.forEach(otherButton => {
      const { element, active } = otherButton;
      const isActive = element === button.element;

      element.classList.toggle('user-creation-selection-active', isActive);
      element.classList.toggle('no-hover-effect', isActive);
      otherButton.active = isActive;

      if (startAnimation) {
        const headerTwoElement = document.getElementById('header-two');
        headerTwoElement.classList.add('fadeIn', 'first');

        const selectBoxElement = document.getElementById("user-form-select-box");
        selectBoxElement.classList.add('fadeIn', 'second');

        const rightElement = document.getElementById("user-form-right");
        rightElement.classList.add('fadeIn', 'third');

        startAnimation = false;
      }
    });
  });
});

const creatorButtonElement = document.querySelector('.creator');
const explorterCpButtonElement = document.querySelector('.explorer-can-publish');
const explorerButtonElement = document.querySelector('.explorer');
const viewerButtonElement = document.querySelector('.viewer');
const sameButtonElement = document.querySelector('.same');

const buttonsRoles = [
    { element: creatorButtonElement, active: false },
    { element: explorterCpButtonElement, active: false },
    { element: explorerButtonElement, active: false },
    { element: viewerButtonElement, active: false},
    { element: sameButtonElement , active: false},
  ];
  
  buttonsRoles.forEach(button => {
    button.element.addEventListener('click', () => {
      buttonsRoles.forEach(otherButton => {
        const { element, active } = otherButton;
        const isActive = element === button.element;
  
        element.classList.toggle('user-roles-selection-active', isActive);
        element.classList.toggle('no-hover-effect', isActive);
        otherButton.active = isActive;
      });
    });
});

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");


const optionsList = document.querySelectorAll('.option');

selected.addEventListener('click', () => {
  optionsContainer.classList.toggle("active");
  
  searchBox.value = "";
  filterList("");

  if (optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionsList.forEach(o => {
  o.addEventListener('click', () => {
    selected.innerHTML = o.querySelector('label').innerHTML;
    optionsContainer.classList.remove('active');
  })
})


searchBox.addEventListener("keyup", e => {
  filterList(e.target.value);
});

const filterList = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
}; 

const buttonRowElement = document.querySelector('.button-row');
let startSecondAnimation = true;

optionsList.forEach(o => {
  o.addEventListener('click', () => {
    let addButton = true;

    const divs = buttonRowElement.querySelectorAll('div');
    const content = o.querySelector('label').textContent;

    divs.forEach(element => {
      const result = element.textContent.split(" ")[0];

      if (result === content) {
        addButton = false;
      }
    });

    const group = content.slice(content.lastIndexOf("_") + 1);
    if (addButton) {
      const newButtonElement = document.createElement('div');
      newButtonElement.className = `main ${group}`;
      newButtonElement.innerHTML = `${content} <button class="x">x</button>`;
      buttonRowElement.appendChild(newButtonElement);
    }

    if (startSecondAnimation) {
      const headerThreeElement = document.getElementById('header-three');
      headerThreeElement.classList.add('fadeIn', 'one');

      const numbers = ['first', 'second', 'third', 'fourth', 'fived', 'sixth'];
      const buttons = document.querySelectorAll('#user-form-row-three button');

      buttons.forEach((element, index) => {
        const wordCount = numbers[index + 1]; 
        console.log(wordCount);
        element.classList.add('fadeIn', wordCount);
      });
    };
  });
});


// Attach click event listener to the document
document.addEventListener("click", function(event) {
  // Check if the clicked element is a button with class "x"
  if (event.target.classList.contains("x")) {
    // Get the parent div of the clicked button
    const parentDiv = event.target.parentNode;

    // Remove the parent div and its grandparent div
    parentDiv.remove();
    if (parentDiv.parentNode) {
      parentDiv.parentNode.remove();
    }
  }
});


// handle click open event and show the popup
document.getElementById("open-popup").addEventListener("click", function() {
  document.getElementById("upload-popup").style.display = "flex";
});

// handle click close event and hide the popup
document.getElementById("closeButton").addEventListener("click", function() {
  document.getElementById("upload-popup").style.display = "none";
});

// handle input of popup
const textareaElement = document.querySelector('.in');
const seperatorElement = document.getElementById('separator');

seperatorElement.addEventListener('keyup', event => {
  const separator = event.key;
  let text = textareaElement.value;

  const possibleEnds = ['.com', '.net', '.org', '.edu', '.gov', '.mil', '.co.uk', '.de', '.fr', '.ca'];
  possibleEnds.forEach(e => {
    let match;
    const regex = new RegExp(e, 'g');
    regex.lastIndex = 0; 

    while ((match = regex.exec(text)) !== null) {
      const insertIndex = match.index + match[0].length; 
      text = text.substring(0, insertIndex) + separator + text.substring(insertIndex);
    }
  });

  textareaElement.value = text;

  const values = textareaElement.value.split(separator).map(value => value.trim());

  createUserRow(values);
});


const fileInput = document.getElementById('csvFileInput');
const uploadButton = document.getElementById('uploadButton');
document.getElementById("csv-upload-msg-container").style.display = "none";

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  
  if (file && file.type === 'text/csv' && file.name.endsWith('.csv')) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(file);
  } else {
    alert('Please select a semicolon-separated CSV file.');
  }
});

function handleFileLoad(event) {
  const csvMsgContainerElement = document.getElementById("csv-upload-msg-container");
  csvMsgContainerElement.style.display = "flex";

  setTimeout(() => {
    csvMsgContainerElement.style.animation = "fade-out 2s ease forwards";
  }, 5000); 

  setTimeout(() => {
    csvMsgContainerElement.style.display = "none";
  }, 7000); 
  
  const csvData = event.target.result;

  const values = csvData.split(",").map(value => value.trim());
  values.shift();

  createUserRow(values);
}

const tableContainerElement = document.querySelector('.table-container');

function createUserRow(users) {
  let isFirstIteration = true;

  users.forEach(e => {
    let row = `<div class="row"> <input type="text" value="${e}"> <button class="delete-button">X</button> </div>`;

    if (isFirstIteration) {
      row = `<div class="row"> <input class="first-input" type="text" value="${e}"> <button class="delete-button">X</button> </div>`;
      isFirstIteration = false;
    }

    tableContainerElement.innerHTML += row;
  });
}

// Attach click event listener to the document
document.addEventListener("click", function(event) {
  // Check if the clicked element is a button with class "x"
  if (event.target.classList.contains("delete-button")) {
    // Get the parent div of the clicked button
    const parentDiv = event.target.parentNode;

    // Remove the parent div and its grandparent div
    parentDiv.remove();
    if (parentDiv.parentNode) {
      parentDiv.parentNode.remove();
    }
  }
});

