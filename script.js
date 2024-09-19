// Select DOM elements
const billAmount = document.getElementById('bill-amount');
const peopleNumber = document.getElementById('people-number');
const tipButtons = document.querySelectorAll('[id="tip"]');
const tipPerPersonDisplay = document.querySelector('.tip-per-person h1');
const totalPerPersonDisplay = document.querySelector('.total-per-person h1');
const resetButton = document.querySelector('button[type="reset"]');

// State variables
let bill = 0;
let people = 1; // Default to 1 to avoid division by zero
let tipPercent = 0;

// Add event listeners to inputs and buttons
billAmount.addEventListener('input', updateBill);
peopleNumber.addEventListener('input', updatePeople);
tipButtons.forEach(button => button.addEventListener('click', updateTip));
resetButton.addEventListener('click', resetCalculator);

function updateBill() {
  bill = parseFloat(billAmount.value) || 0; // Update bill amount or set to 0 if invalid
  calculateTip();
}

function updatePeople() {
  people = parseInt(peopleNumber.value) || 1; // Default to 1 if input is invalid
  if (people <= 0) {
    people = 1;
    alert("Number of people can't be zero or negative.");
  }
  calculateTip();
}

function updateTip(event) {
  // Handle custom input case
  if (event.target.innerText === 'Custom') {
    const customTip = prompt("Enter custom tip percentage:");
    if (customTip !== null && !isNaN(customTip) && customTip > 0) {
      tipPercent = parseFloat(customTip) / 100;
    } else {
      tipPercent = 0;
      alert("Please enter a valid custom tip percentage.");
    }
  } else {
    // Update tip percent based on button text
    tipPercent = parseFloat(event.target.innerText) / 100;
  }
  calculateTip();
}

function calculateTip() {
  console.log(`Calculating... Bill: ${bill}, People: ${people}, Tip: ${tipPercent * 100}%`);
  if (bill > 0 && people > 0 && tipPercent > 0) {
    const tipAmountPerPerson = (bill * tipPercent) / people;
    const totalAmountPerPerson = (bill / people) + tipAmountPerPerson;

    // Display the calculated values
    tipPerPersonDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalPerPersonDisplay.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
  } else {
    // Reset the displayed values if inputs are not valid
    tipPerPersonDisplay.textContent = `$0.00`;
    totalPerPersonDisplay.textContent = `$0.00`;
  }
}

function resetCalculator() {
  // Reset all values and displays
  billAmount.value = '';
  peopleNumber.value = '';
  bill = 0;
  people = 1;
  tipPercent = 0;
  tipPerPersonDisplay.textContent = `$0.00`;
  totalPerPersonDisplay.textContent = `$0.00`;
}

